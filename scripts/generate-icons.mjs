#!/usr/bin/env node
/**
 * Generate PWA icons for ACNH Progress Tracker
 * Creates simple ACNH-themed icons with leaf design
 *
 * Run: node scripts/generate-icons.mjs
 */

import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.join(__dirname, '../public/icons');

// ACNH colors
const CREAM = '#FDF8E8';
const NOOK_GREEN = '#5D9C59';
const DARK_GREEN = '#4A7D47';

// Ensure icons directory exists
if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR, { recursive: true });
}

/**
 * Draw ACNH leaf icon on canvas
 */
function drawLeaf(ctx, centerX, centerY, size) {
  const leafSize = size * 0.4;

  ctx.save();
  ctx.translate(centerX, centerY);

  // Draw leaf body (rounded shape)
  ctx.fillStyle = NOOK_GREEN;
  ctx.beginPath();

  // Main leaf shape using bezier curves
  ctx.moveTo(0, -leafSize * 0.8);
  ctx.bezierCurveTo(
    leafSize * 0.5, -leafSize * 0.7,
    leafSize * 0.6, -leafSize * 0.2,
    leafSize * 0.5, leafSize * 0.3
  );
  ctx.bezierCurveTo(
    leafSize * 0.4, leafSize * 0.5,
    leafSize * 0.2, leafSize * 0.6,
    0, leafSize * 0.6
  );
  ctx.bezierCurveTo(
    -leafSize * 0.2, leafSize * 0.6,
    -leafSize * 0.4, leafSize * 0.5,
    -leafSize * 0.5, leafSize * 0.3
  );
  ctx.bezierCurveTo(
    -leafSize * 0.6, -leafSize * 0.2,
    -leafSize * 0.5, -leafSize * 0.7,
    0, -leafSize * 0.8
  );
  ctx.closePath();
  ctx.fill();

  // Draw center vein
  ctx.strokeStyle = DARK_GREEN;
  ctx.lineWidth = size * 0.02;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(0, -leafSize * 0.5);
  ctx.lineTo(0, leafSize * 0.4);
  ctx.stroke();

  // Draw side veins
  const veinCount = 3;
  for (let i = 0; i < veinCount; i++) {
    const y = -leafSize * 0.3 + (i * leafSize * 0.25);
    const length = leafSize * (0.3 - i * 0.05);

    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.quadraticCurveTo(length * 0.5, y - leafSize * 0.1, length, y + leafSize * 0.05);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.quadraticCurveTo(-length * 0.5, y - leafSize * 0.1, -length, y + leafSize * 0.05);
    ctx.stroke();
  }

  // Draw stem
  ctx.strokeStyle = DARK_GREEN;
  ctx.lineWidth = size * 0.025;
  ctx.beginPath();
  ctx.moveTo(0, leafSize * 0.4);
  ctx.quadraticCurveTo(leafSize * 0.1, leafSize * 0.6, leafSize * 0.15, leafSize * 0.7);
  ctx.stroke();

  ctx.restore();
}

/**
 * Generate icon at specified size
 */
function generateIcon(size, filename) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Fill background with cream
  ctx.fillStyle = CREAM;
  ctx.fillRect(0, 0, size, size);

  // Add subtle rounded corners effect (for visual polish)
  if (size >= 128) {
    ctx.fillStyle = CREAM;
    const cornerRadius = size * 0.15;
    ctx.beginPath();
    ctx.roundRect(0, 0, size, size, cornerRadius);
    ctx.fill();

    // Clear and redraw with rounded rect clip
    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(0, 0, size, size, cornerRadius);
    ctx.clip();
    ctx.fillStyle = CREAM;
    ctx.fillRect(0, 0, size, size);

    // Draw leaf in center
    drawLeaf(ctx, size / 2, size / 2, size);
    ctx.restore();
  } else {
    // For small icons, just draw directly
    drawLeaf(ctx, size / 2, size / 2, size);
  }

  // Save to file
  const buffer = canvas.toBuffer('image/png');
  const filepath = path.join(ICONS_DIR, filename);
  fs.writeFileSync(filepath, buffer);
  console.log(`Generated: ${filename} (${size}x${size})`);
}

/**
 * Generate favicon.ico from small PNG
 */
function generateFavicon() {
  // Generate a simple 32x32 icon
  const canvas = createCanvas(32, 32);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = CREAM;
  ctx.fillRect(0, 0, 32, 32);
  drawLeaf(ctx, 16, 16, 32);

  const buffer = canvas.toBuffer('image/png');
  const filepath = path.join(__dirname, '../public/favicon.ico');
  fs.writeFileSync(filepath, buffer);
  console.log('Generated: favicon.ico (32x32)');
}

// Generate all required icons
console.log('Generating ACNH PWA icons...\n');

generateIcon(512, 'icon-512x512.png');
generateIcon(192, 'icon-192x192.png');
generateIcon(180, 'apple-touch-icon.png');
generateIcon(32, 'favicon-32x32.png');
generateIcon(16, 'favicon-16x16.png');
generateFavicon();

console.log('\nDone! Icons created in public/icons/');
