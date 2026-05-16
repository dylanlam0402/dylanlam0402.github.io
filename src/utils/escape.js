const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;' };

export function escapeHtml(str) {
    return String(str).replace(/[&<>"'/]/g, (c) => ESC[c]);
}

// Allow https:, mailto:, tel:, root-relative (/foo), and same-origin relative
// paths (foo.webp, images/foo.png). Reject protocol-relative (//evil.com),
// javascript:, data:, parent traversal (../), and anything else.
export function safeUrl(url) {
    const s = String(url);
    if (/^(https?:|mailto:|tel:|\/[^/])/i.test(s)) return s;
    if (/^[a-zA-Z0-9_][a-zA-Z0-9_./-]*$/.test(s) && !s.includes('..')) return s;
    return '#';
}
