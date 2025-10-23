export function getEventSlug(event) {
  const dateObj = new Date(event.date);
  const isoDate = isNaN(dateObj) ? '' : dateObj.toISOString().split('T')[0];
  const titleSlug = event.title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `${isoDate}-${titleSlug}`;
}

export function formatEventDate(dateStr) {
  const dateObj = new Date(dateStr);
  return isNaN(dateObj)
    ? dateStr
    : dateObj.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
}
