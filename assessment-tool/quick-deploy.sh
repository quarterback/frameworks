#!/bin/bash

# Quick Deploy Script for Relationship Assessment Tool
# This script helps you deploy the assessment tool to Vercel or Netlify

echo "🚀 Relationship Assessment Tool - Quick Deploy"
echo "=============================================="
echo ""

# Check if we're in the assessment-tool directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the assessment-tool directory"
    echo "   cd assessment-tool && bash quick-deploy.sh"
    exit 1
fi

echo "Choose your deployment platform:"
echo "1) Vercel (Recommended)"
echo "2) Netlify"
echo "3) Build locally and test"
echo ""
read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo ""
        echo "📦 Deploying to Vercel..."
        echo ""
        
        # Check if vercel is installed
        if ! command -v vercel &> /dev/null; then
            echo "Installing Vercel CLI..."
            npm install -g vercel
        fi
        
        echo "Starting deployment..."
        vercel --prod
        
        echo ""
        echo "✅ Deployment complete! Your app is now live."
        ;;
        
    2)
        echo ""
        echo "📦 Deploying to Netlify..."
        echo ""
        
        # Check if netlify is installed
        if ! command -v netlify &> /dev/null; then
            echo "Installing Netlify CLI..."
            npm install -g netlify-cli
        fi
        
        echo "Building the app..."
        npm run build
        
        echo "Deploying to Netlify..."
        netlify deploy --prod
        
        echo ""
        echo "✅ Deployment complete! Your app is now live."
        ;;
        
    3)
        echo ""
        echo "🔨 Building the app locally..."
        npm run build
        
        echo ""
        echo "🌐 Starting preview server..."
        echo "The app will be available at http://localhost:4173"
        echo "Press Ctrl+C to stop the server"
        echo ""
        npm run preview
        ;;
        
    *)
        echo "❌ Invalid choice. Please run the script again and choose 1, 2, or 3."
        exit 1
        ;;
esac
