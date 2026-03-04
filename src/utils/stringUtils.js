/**
 * Strips all HTML tags from a string and returns plain text.
 * Also decodes common HTML entities.
 * @param {string} html - The string containing HTML tags.
 * @returns {string} - The plain text string.
 */
export const stripHtml = (html) => {
    if (!html) return '';

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

    let text = html;

    // 1. Decode entities first so encoded tags become literal tags
    Object.keys(entities).forEach(entity => {
        text = text.replace(new RegExp(entity, 'gi'), entities[entity]);
    });

    // 2. Remove all HTML tags (now including the decoded ones)
    text = text.replace(/<[^>]*>?/gm, '');

    // 3. One more pass for any nested tags or edge cases
    text = text.replace(/<[^>]*>?/gm, '');

    return text.trim();
};
