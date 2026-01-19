#!/bin/bash
set -e

# Configuration
BUCKET="acnh-creative-solver.keepquietandprompt.com"
DISTRIBUTION_ID="E2YWJXRZQWJ0DC"
AWS_PROFILE="sgcc-eric-admin"

echo "🌿 ACNH Progress Tracker Deployment"
echo "===================================="
echo ""

# Build the project
echo "📦 Building project..."
npm run build
echo ""

# Upload static assets with long cache (1 year)
echo "📤 Uploading static assets (with immutable cache)..."
aws s3 sync out/ s3://$BUCKET --delete --profile $AWS_PROFILE \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "*.html" \
  --exclude "sw.js" \
  --exclude "manifest.json" \
  --exclude "workbox-*.js"

# Upload HTML files with no-cache
echo "📤 Uploading HTML files (no cache)..."
aws s3 sync out/ s3://$BUCKET --profile $AWS_PROFILE \
  --cache-control "public, max-age=0, must-revalidate" \
  --include "*.html" \
  --exclude "*" \
  --content-type "text/html"

# Find and upload all HTML files in subdirectories
find out -name "*.html" -type f | while read file; do
  # Get the relative path from out/
  relative_path="${file#out/}"
  echo "  Uploading: $relative_path"
  aws s3 cp "$file" "s3://$BUCKET/$relative_path" --profile $AWS_PROFILE \
    --cache-control "public, max-age=0, must-revalidate" \
    --content-type "text/html"
done

# Upload service worker and manifest with no-cache
echo "📤 Uploading PWA files (no cache)..."
aws s3 cp out/sw.js s3://$BUCKET/sw.js --profile $AWS_PROFILE \
  --cache-control "public, max-age=0, must-revalidate" \
  --content-type "application/javascript"

aws s3 cp out/manifest.json s3://$BUCKET/manifest.json --profile $AWS_PROFILE \
  --cache-control "public, max-age=0, must-revalidate" \
  --content-type "application/json"

# Upload workbox with no-cache (it has hashed names but still better to not cache forever)
for workbox_file in out/workbox-*.js; do
  if [ -f "$workbox_file" ]; then
    filename=$(basename "$workbox_file")
    aws s3 cp "$workbox_file" "s3://$BUCKET/$filename" --profile $AWS_PROFILE \
      --cache-control "public, max-age=0, must-revalidate" \
      --content-type "application/javascript"
  fi
done

echo ""

# Invalidate CloudFront cache
echo "🔄 Invalidating CloudFront cache..."
INVALIDATION_ID=$(aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/*" \
  --profile $AWS_PROFILE \
  --query 'Invalidation.Id' \
  --output text)

echo "   Invalidation ID: $INVALIDATION_ID"
echo ""

# Wait for invalidation to complete
echo "⏳ Waiting for invalidation to complete..."
aws cloudfront wait invalidation-completed \
  --distribution-id $DISTRIBUTION_ID \
  --id $INVALIDATION_ID \
  --profile $AWS_PROFILE

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Your site is live at:"
echo "   https://acnh-creative-solver.keepquietandprompt.com"
echo ""
