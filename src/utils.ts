
export const truncateString = (s?: string, n = 50) => {
    if (!s) return '';
    return s.length > n ? s.slice(0, n - 1) + '…' : s;
};