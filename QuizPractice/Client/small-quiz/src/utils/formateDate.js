export function formatDate(newDate) {
    const d = new Date();
    const year = d.getFullYear();
    const date = d.getDate();
    const monthName = d.getMonth();
    const formatted = `${date}-${monthName}-${year}`;
    return formatted.toString();
  }