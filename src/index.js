const { javascriptManipulator } = require('./languages/javascript');

/**
 * Merges a piece of code into another one, handling duplication and conflicts.
 * @param {string} currentCode - The current code to merge into.
 * @param {string} stepCode - The code to merge.
 * @param {string} language - The language of the code (currently only 'js' is supported).
 * @returns {Promise<string>} The merged code.
 */
async function mergeCode(currentCode, stepCode, language) {
  switch (language) {
    case 'js': {
      const manipulator = new javascriptManipulator();
      await manipulator.setCode(currentCode);
      return await manipulator.mergeCode(stepCode);
    }
    default:
      throw new Error(`Language ${language} is not supported.`);
  }
}

module.exports = { mergeCode }; 