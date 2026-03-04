/**
 * Strips all HTML tags from a string and returns plain text.
 * Also decodes common HTML entities.
 * @param {string} html - The string containing HTML tags.
 * @returns {string} - The plain text string.
 */
export const stripHtml = (html) => {
    if (!html) return '';

    // 1. Remove all HTML tags
    let text = html.replace(/<[^>]*>?/gm, '');

    // 2. Decode common HTML entities (if any are left by the Rich Text Editor)
    const entities = {
        '&nbsp;': ' ',
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'",
        '&copy;': '©',
        '&reg;': '®'
    };

    Object.keys(entities).forEach(entity => {
        text = text.replace(new RegExp(entity, 'g'), entities[entity]);
    });

    return text.trim();
};
