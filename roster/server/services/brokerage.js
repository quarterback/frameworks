import db from '../db.js';

const BROKERAGE_API_URL = process.env.BROKERAGE_API_URL || 'https://drydown.replit.app';
const BROKERAGE_API_KEY = process.env.BROKERAGE_API_KEY || '';
const APP_ID = 'roster';

async function brokerageRequest(endpoint, options = {}) {
  const url = `${BROKERAGE_API_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BROKERAGE_API_KEY}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`Brokerage API error: ${response.status} - ${error}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Brokerage API error:', error.message);
    return null;
  }
}

function getUserDid(userId) {
  return `roster-user-${userId}`;
}

// Register identity with brokerage
export async function registerIdentity(userId, email) {
  const did = getUserDid(userId);

  const result = await brokerageRequest('/v1/identities/register', {
    method: 'POST',
    body: JSON.stringify({
      did,
      handle: email,
      appId: APP_ID,
    }),
  });

  // Initialize local credits if brokerage fails
  if (!result) {
    initializeLocalCredits(userId);
  }

  return result;
}

// Get SPA state from brokerage
export async function getSpaState(userId) {
  const did = getUserDid(userId);

  const result = await brokerageRequest(`/v1/spa/${did}/state?appId=${APP_ID}`);

  // Fallback to local credits
  if (!result) {
    return getLocalCredits(userId);
  }

  return {
    creditsRemaining: result.remainingUnits || 10,
    creditsTotal: result.totalUnits || 10,
    refreshDate: result.refreshDate || getNextRefreshDate(),
  };
}

// Use credits via brokerage
export async function useCredits(userId, targetUserId, creditCount) {
  const did = getUserDid(userId);
  const targetDid = getUserDid(targetUserId);

  const result = await brokerageRequest(`/v1/spa/${did}/use-units`, {
    method: 'POST',
    body: JSON.stringify({
      targetDid,
      unitCount: creditCount,
      appId: APP_ID,
    }),
  });

  // Fallback to local credits
  if (!result) {
    return useLocalCredits(userId, creditCount);
  }

  return {
    success: true,
    creditsRemaining: result.remainingUnits,
  };
}

// Report positive interaction to brokerage
export async function reportInteraction(subjectUserId, actorUserId, notes = '') {
  const subjectDid = getUserDid(subjectUserId);
  const actorDid = getUserDid(actorUserId);

  await brokerageRequest('/v1/trust/events', {
    method: 'POST',
    body: JSON.stringify({
      subjectDid,
      actorDid,
      appId: APP_ID,
      type: 'positive_interaction',
      notes,
    }),
  });
}

// Get reputation from brokerage
export async function getReputation(userId) {
  const did = getUserDid(userId);

  const result = await brokerageRequest(`/v1/reputation/${did}`);

  // Return default reputation if brokerage fails
  if (!result) {
    return 50 + Math.floor(Math.random() * 30); // 50-79
  }

  return result.score || 50;
}

// Local credits fallback functions
function initializeLocalCredits(userId) {
  const existing = db.prepare('SELECT * FROM credits WHERE user_id = ?').get(userId);

  if (!existing) {
    db.prepare(`
      INSERT INTO credits (user_id, credits_remaining, credits_total, refresh_date)
      VALUES (?, 10, 10, ?)
    `).run(userId, getNextRefreshDate());
  }
}

function getLocalCredits(userId) {
  initializeLocalCredits(userId);

  const credits = db.prepare('SELECT * FROM credits WHERE user_id = ?').get(userId);

  // Check if credits should be refreshed
  if (new Date(credits.refresh_date) < new Date()) {
    db.prepare(`
      UPDATE credits
      SET credits_remaining = credits_total, refresh_date = ?
      WHERE user_id = ?
    `).run(getNextRefreshDate(), userId);

    return {
      creditsRemaining: credits.credits_total,
      creditsTotal: credits.credits_total,
      refreshDate: getNextRefreshDate(),
    };
  }

  return {
    creditsRemaining: credits.credits_remaining,
    creditsTotal: credits.credits_total,
    refreshDate: credits.refresh_date,
  };
}

function useLocalCredits(userId, creditCount) {
  const credits = getLocalCredits(userId);

  if (credits.creditsRemaining < creditCount) {
    return { success: false, error: 'Not enough credits' };
  }

  db.prepare(`
    UPDATE credits
    SET credits_remaining = credits_remaining - ?
    WHERE user_id = ?
  `).run(creditCount, userId);

  return {
    success: true,
    creditsRemaining: credits.creditsRemaining - creditCount,
  };
}

function getNextRefreshDate() {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return nextMonth.toISOString();
}
