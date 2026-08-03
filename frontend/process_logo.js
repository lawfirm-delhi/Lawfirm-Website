import { Jimp } from 'jimp';
import path from 'path';

async function processLogo() {
  const inputPath = path.resolve('public/images/logo.png');
  const badgeOutputPath = path.resolve('public/images/logo_badge.png');
  const transparentOutputPath = path.resolve('public/images/logo_transparent.png');

  console.log('Loading image from:', inputPath);
  const image = await Jimp.read(inputPath);

  const w = image.bitmap.width;
  const h = image.bitmap.height;
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) / 2 - 4; // radius to clip corners cleanly

  // Create two clones for processing
  const badgeImage = image.clone();
  const transparentImage = image.clone();

  console.log(`Processing image size: ${w}x${h}, center: (${cx}, ${cy}), radius: ${r}`);

  // Process Option A: Circular Badge (transparent outside circle, keep inside intact)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > r) {
        // Set pixel outside circle to transparent
        badgeImage.setPixelColor(0x00000000, x, y);
      }
    }
  }
  await badgeImage.write(badgeOutputPath);
  console.log('Saved circular badge logo to:', badgeOutputPath);

  // Process Option B: Gold-on-Transparent (transparent background, turn black text to gold)
  // Gold color: #A38342 (RGB: 163, 131, 66) -> Hex for Jimp: 0xA38342FF
  // We'll scan pixels:
  // - If outside circle: transparent
  // - If inside circle:
  //   - If pixel is very light (cream/white background): make transparent
  //   - If pixel is dark (black text/lines): turn to gold or keep gold parts gold
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > r) {
        transparentImage.setPixelColor(0x00000000, x, y);
      } else {
        const color = transparentImage.getPixelColor(x, y);
        // Extract RGBA channels
        const rVal = (color >> 24) & 0xff;
        const gVal = (color >> 16) & 0xff;
        const bVal = (color >> 8) & 0xff;
        const aVal = color & 0xff;

        // Calculate brightness/luminance
        const luminance = 0.299 * rVal + 0.587 * gVal + 0.114 * bVal;

        if (luminance > 220) {
          // It's a light cream/white background pixel -> make transparent
          // We can apply a slight soft blending near borders
          transparentImage.setPixelColor(0x00000000, x, y);
        } else if (luminance < 120) {
          // It's a dark/black pixel -> convert to premium gold (#A38342)
          transparentImage.setPixelColor(0xA38342FF, x, y);
        } else {
          // It's an intermediate/gold pixel -> keep it gold
          // (Optionally normalize it to the theme gold)
          transparentImage.setPixelColor(0xA38342FF, x, y);
        }
      }
    }
  }

  // Apply a slight blur and resize or just save
  await transparentImage.write(transparentOutputPath);
  console.log('Saved transparent gold logo to:', transparentOutputPath);
}

processLogo().catch(console.error);
