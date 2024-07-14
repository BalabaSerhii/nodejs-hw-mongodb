const parseNumber = (value, defaultValue) => {
  const parsedNumber = parseInt(value, 10);

  return isNaN(parsedNumber) ? defaultValue : parsedNumber;
};

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
