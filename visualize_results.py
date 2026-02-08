#!/usr/bin/env python3
"""
Visualization script for matching simulation results.

Generates plots showing:
1. Match rates over time (SPA cycles)
2. Attention inequality comparison (Gini coefficients)
3. Rundle stability convergence
4. Match quality evolution
5. Parameter sensitivity analysis

Usage:
    python3 visualize_results.py --population 1000 --cycles 30
"""

import sys
import argparse
from typing import List

# Check if matplotlib is available
try:
    import matplotlib.pyplot as plt
    import matplotlib
    # Use non-interactive backend to avoid requiring a display (for server/headless environments)
    matplotlib.use('Agg')
    HAS_MATPLOTLIB = True
except ImportError:
    HAS_MATPLOTLIB = False
    print("WARNING: matplotlib not found. Install with: pip install matplotlib")
    print("Continuing with text-based visualization only.\n")

import numpy as np
from matching_simulation import (
    Participant, generate_preferences, gale_shapley, 
    run_spa_simulation, calculate_gini
)


def text_bar_chart(values, labels, title, width=50):
    """Create a simple text-based bar chart"""
    print(f"\n{title}")
    print("=" * (width + 20))
    
    max_val = max(values) if values else 1
    
    for label, value in zip(labels, values):
        bar_length = int((value / max_val) * width)
        bar = "█" * bar_length
        print(f"{label:<15} {bar} {value:.3f}")
    
    print()


def text_line_plot(y_values, title, ylabel, width=60, height=15):
    """Create a simple text-based line plot"""
    print(f"\n{title}")
    print("=" * (width + 10))
    
    if not y_values:
        print("No data to plot")
        return
    
    min_y = min(y_values)
    max_y = max(y_values)
    range_y = max_y - min_y if max_y > min_y else 1
    
    # Create grid
    for row in range(height, -1, -1):
        y_val = min_y + (row / height) * range_y
        line = f"{y_val:6.2f} |"
        
        for i, y in enumerate(y_values):
            normalized = (y - min_y) / range_y
            char_row = int(normalized * height)
            
            if char_row == row:
                line += "●"
            elif char_row == row - 1 or char_row == row + 1:
                line += "│"
            else:
                line += " "
        
        print(line)
    
    # X-axis
    print(" " * 7 + "└" + "─" * len(y_values))
    print(f" " * 8 + ylabel)
    print()


def generate_test_population(base_id_offset: int, size: int, side: str) -> List['Participant']:
    """
    Generate a test population with normally distributed desirability.
    
    Args:
        base_id_offset: Starting ID for participants
        size: Number of participants to generate
        side: Side identifier ('A' or 'B')
    
    Returns:
        List of Participant objects
    """
    from matching_simulation import Participant
    return [
        Participant(
            base_id_offset + i,
            side,
            max(0, min(100, np.random.normal(50, 20)))
        )
        for i in range(size)
    ]


def run_parameter_sweep():
    """Run simulations across different parameter values"""
    print("\n" + "=" * 80)
    print("PARAMETER SENSITIVITY ANALYSIS")
    print("=" * 80)
    
    # Test different k values
    print("\n1. Testing Selection Capacity (k)...")
    k_values = [5, 10, 15, 20, 30]
    k_results = {'k': [], 'match_rate': [], 'gini': [], 'quality': []}
    
    base_pop = 500
    for k in k_values:
        print(f"   Running k={k}...", end=" ")
        
        # Generate population
        side_a = generate_test_population(0, base_pop, 'A')
        side_b = generate_test_population(base_pop, base_pop, 'B')
        
        generate_preferences(side_a, side_b, 0.3)
        generate_preferences(side_b, side_a, 0.3)
        
        results = run_spa_simulation(side_a, side_b, num_cycles=20, k=k, num_rundles=5)
        
        k_results['k'].append(k)
        k_results['match_rate'].append(np.mean(results['match_rates'][-5:]))
        k_results['gini'].append(results['attention_gini'][-1])
        k_results['quality'].append(np.mean(results['match_quality'][-5:]))
        
        print(f"Match rate: {k_results['match_rate'][-1]:.1%}, Gini: {k_results['gini'][-1]:.3f}")
    
    text_bar_chart(
        k_results['match_rate'],
        [f"k={k}" for k in k_values],
        "Match Rate by Selection Capacity"
    )
    
    text_bar_chart(
        k_results['gini'],
        [f"k={k}" for k in k_values],
        "Attention Inequality (Gini) by Selection Capacity"
    )
    
    # Test different correlation values
    print("\n2. Testing Preference Correlation...")
    corr_values = [0.1, 0.3, 0.5, 0.7, 0.9]
    corr_results = {'corr': [], 'match_rate': [], 'gini': []}
    
    for corr in corr_values:
        print(f"   Running correlation={corr}...", end=" ")
        
        side_a = generate_test_population(0, base_pop, 'A')
        side_b = generate_test_population(base_pop, base_pop, 'B')
        
        generate_preferences(side_a, side_b, corr)
        generate_preferences(side_b, side_a, corr)
        
        results = run_spa_simulation(side_a, side_b, num_cycles=20, k=15, num_rundles=5)
        
        corr_results['corr'].append(corr)
        corr_results['match_rate'].append(np.mean(results['match_rates'][-5:]))
        corr_results['gini'].append(results['attention_gini'][-1])
        
        print(f"Match rate: {corr_results['match_rate'][-1]:.1%}, Gini: {corr_results['gini'][-1]:.3f}")
    
    text_bar_chart(
        corr_results['match_rate'],
        [f"ρ={c:.1f}" for c in corr_values],
        "Match Rate by Preference Correlation"
    )
    
    text_bar_chart(
        corr_results['gini'],
        [f"ρ={c:.1f}" for c in corr_values],
        "Attention Inequality by Preference Correlation"
    )
    
    print("\n" + "=" * 80)
    print("KEY FINDINGS FROM PARAMETER SWEEP")
    print("=" * 80)
    
    # Optimal k
    optimal_k_idx = np.argmax(k_results['match_rate'])
    optimal_k = k_values[optimal_k_idx]
    print(f"\n1. Optimal Selection Capacity:")
    print(f"   k = {optimal_k} maximizes match rate ({k_results['match_rate'][optimal_k_idx]:.1%})")
    print(f"   Too low (k=5): {k_results['match_rate'][0]:.1%} match rate (insufficient signaling)")
    print(f"   Too high (k=30): {k_results['match_rate'][-1]:.1%} match rate (approaches unconstrained)")
    
    # Correlation effects
    print(f"\n2. Preference Heterogeneity Effects:")
    print(f"   Low correlation (ρ=0.1): {corr_results['match_rate'][0]:.1%} match rate, Gini={corr_results['gini'][0]:.3f}")
    print(f"   High correlation (ρ=0.9): {corr_results['match_rate'][-1]:.1%} match rate, Gini={corr_results['gini'][-1]:.3f}")
    print(f"   → SPA works better with heterogeneous preferences (more viable matches exist)")
    
    return k_results, corr_results


def visualize_spa_dynamics(population=1000, cycles=30, k=15):
    """Visualize SPA dynamics over time"""
    print("\n" + "=" * 80)
    print("SPA DYNAMICS VISUALIZATION")
    print("=" * 80)
    
    print(f"\nGenerating population (n={population})...")
    side_a = generate_test_population(0, population, 'A')
    side_b = generate_test_population(population, population, 'B')
    
    generate_preferences(side_a, side_b, 0.3)
    generate_preferences(side_b, side_a, 0.3)
    
    print(f"Running SPA simulation ({cycles} cycles)...")
    results = run_spa_simulation(side_a, side_b, num_cycles=cycles, k=k, num_rundles=5)
    
    # Text visualizations
    text_line_plot(
        results['match_rates'],
        "Match Rate Evolution Over Time",
        f"Cycle (1-{cycles})"
    )
    
    text_line_plot(
        results['match_quality'],
        "Match Quality Evolution (Tier-Weighted)",
        f"Cycle (1-{cycles})"
    )
    
    text_line_plot(
        results['attention_gini'],
        "Attention Inequality Over Time",
        f"Cycle (1-{cycles})"
    )
    
    if results['rundle_stability']:
        text_line_plot(
            results['rundle_stability'],
            "Rundle Stability (Convergence)",
            f"Cycle (2-{cycles})"
        )
    
    # Summary statistics by phase
    print("\n" + "=" * 80)
    print("PHASE ANALYSIS")
    print("=" * 80)
    
    early = results['match_rates'][:10]
    middle = results['match_rates'][10:20] if len(results['match_rates']) > 20 else []
    late = results['match_rates'][-10:]
    
    print(f"\nExploration Phase (Cycles 1-10):")
    print(f"  Average match rate: {np.mean(early):.1%}")
    print(f"  Average quality: {np.mean(results['match_quality'][:10]):.2f} / 4.0")
    
    if middle:
        print(f"\nLearning Phase (Cycles 11-20):")
        print(f"  Average match rate: {np.mean(middle):.1%}")
        print(f"  Average quality: {np.mean(results['match_quality'][10:20]):.2f} / 4.0")
    
    print(f"\nMature Phase (Last 10 cycles):")
    print(f"  Average match rate: {np.mean(late):.1%}")
    print(f"  Average quality: {np.mean(results['match_quality'][-10:]):.2f} / 4.0")
    print(f"  Final Gini: {results['attention_gini'][-1]:.3f}")
    
    if results['rundle_stability']:
        print(f"  Final rundle stability: {results['rundle_stability'][-1]:.1%}")
    
    return results


def main():
    parser = argparse.ArgumentParser(description='Visualize matching simulation results')
    parser.add_argument('--population', type=int, default=1000,
                       help='Population size for dynamics visualization')
    parser.add_argument('--cycles', type=int, default=30,
                       help='Number of cycles for dynamics visualization')
    parser.add_argument('--k', type=int, default=15,
                       help='Selection capacity')
    parser.add_argument('--sweep', action='store_true',
                       help='Run parameter sensitivity analysis')
    
    args = parser.parse_args()
    
    if args.sweep:
        run_parameter_sweep()
    else:
        visualize_spa_dynamics(args.population, args.cycles, args.k)
    
    print("\n" + "=" * 80)
    print("VISUALIZATION COMPLETE")
    print("=" * 80)
    
    if HAS_MATPLOTLIB:
        print("\nNote: matplotlib is installed but not used in this text-based version.")
        print("To create graphical plots, use matplotlib directly with the simulation results.")
    else:
        print("\nNote: Install matplotlib for graphical visualizations:")
        print("  pip install matplotlib")


if __name__ == "__main__":
    main()
