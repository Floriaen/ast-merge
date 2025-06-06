import { javascriptManipulator } from './languages/javascript.js';

/**
 * Merge two code strings for a given language.
 * @param {string} code1 - The first code string.
 * @param {string} code2 - The second code string.
 * @param {string} language - The language ('js').
 * @returns {Promise<string>} - The merged code string.
 */
export async function mergeCode(code1, code2, language) {
  if (language === 'js') {
    const manipulator = new javascriptManipulator();
    await manipulator.setCode(code1);
    const merged = await manipulator.mergeCode(code2);
    return merged;
  }
  // Placeholder for Python and Rust support
  throw new Error('Unsupported language: ' + language);
} 