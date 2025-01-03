function getFormattedDate(date) {
  return new Intl.DateTimeFormat("en-GB").format(date);
}

export { getFormattedDate };
