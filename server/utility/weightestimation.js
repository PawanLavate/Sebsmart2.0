/**
 * Calculate total apple weight from Roboflow predictions
 * @param {Array} predictions - Roboflow predictions array
 * @param {number} pixelToCm - scale factor: cm per pixel
 * @returns {number} - total estimated weight in kg
 */
function calculateTotalAppleWeight(predictions, pixelToCm = 0.2) {
  let totalWeightKg = 0;

  predictions.forEach(pred => {
    if (pred.class === "apple") {
      const widthCm = pred.width * pixelToCm;
      const heightCm = pred.height * pixelToCm;

      const radiusCm = (widthCm + heightCm) / 4;

      const volumeCm3 = (4 / 3) * Math.PI * Math.pow(radiusCm, 3);

      
      totalWeightKg += (volumeCm3 * 0.8) / 1000;
    }
  });

  return Number(totalWeightKg.toFixed(2));
}

// Example usage:
// const totalWeight = calculateTotalAppleWeight(predictionsFromRoboflow, 0.2);
// console.log("Estimated total apple weight:", totalWeight, "kg");

export default calculateTotalAppleWeight;