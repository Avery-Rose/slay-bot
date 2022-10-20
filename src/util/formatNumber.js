/**
  * Format a number to have K, M, B, T, etc.
  * @param {number} number - The number to format.

*/
const formatNumber = (number) => {
  if (number < 1000) return number;
  const abbreviations = ['K', 'M', 'B', 'T'];
  const abbreviationIndex = Math.floor(Math.log10(number) / 3) - 1;
  return (
    +(number / Math.pow(1000, abbreviationIndex + 1)).toPrecision(3) +
    abbreviations[abbreviationIndex]
  );
};

module.exports = formatNumber;
