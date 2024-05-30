const sharp = require("sharp");
const fs = require("fs");

/**
 * Compress an image.
 * @param {string} inputPath - The path to the input image.
 * @param {string} outputPath - The path to save the compressed image.
 * @param {number} quality - The quality of the output image (1-100).
 */
async function compressImage(inputPath, outputPath, quality) {
  try {
    await sharp(inputPath)
      .jpeg({ quality: quality }) // You can adjust the quality here
      .toFile(outputPath);

    console.log(`Image compressed and saved to ${outputPath}`);
  } catch (error) {
    console.error(`Error compressing image: ${error.message}`);
  }
}

// Example usage
const inputPath = "C:\\Users\\rafae\\Desktop\\test.jpg"; // Change this to your correct input image path
const outputPath = "C:\\Users\\rafae\\Desktop\\test2.jpg"; // Change this to your desired output path
const quality = 80; // Adjust the quality as needed

compressImage(inputPath, outputPath, quality);
