const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;' };

export function escapeHtml(str) {
    return String(str).replace(/[&<>"'/]/g, (c) => ESC[c]);
}

// Allow only https:, mailto:, tel:, and root-relative URLs.
export function safeUrl(url) {
    if (/^(https?:|mailto:|tel:|\/)/i.test(url)) return url;
    return '#';
}
