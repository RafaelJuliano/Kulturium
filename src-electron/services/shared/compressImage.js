import sharp from "sharp";

/**
 * Compress an image.
 * @param {string} inputPath - The path to the input image.
 * @param {string} outputPath - The path to save the compressed jpgimage.
 * @param {number} quality - Quality, integer 1-100 (optional, default 80).
 */
export async function compressImage(inputPath, outputPath, quality) {
  try {
    await sharp(inputPath).jpeg({ quality }).toFile(outputPath);

    console.log(`Image compressed and saved to ${outputPath}`);
  } catch (error) {
    console.error(`Error compressing image: ${error.message}`);
  }
}
