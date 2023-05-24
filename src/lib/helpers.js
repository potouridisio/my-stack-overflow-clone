export function yearAgo() {
  const oneYearAgoDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);

  const currentYear = new Date(Date.now()).getFullYear();
  const oneYearAgoYear = oneYearAgoDate.getFullYear();
  const yearsDifference = currentYear - oneYearAgoYear;

  return yearsDifference;
}
