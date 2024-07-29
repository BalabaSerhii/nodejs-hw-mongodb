const parseNumber = (value, defaultValue) => {
  const parsedNumber = Number(value);

  if (Number.isNaN(parsedNumber) || parsedNumber <= 0) {
    return defaultValue;
  }

  return parsedNumber;
};

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  const maxPerPage = 100;
  const minPerPage = 1;
  const validatedPerPage = Math.max(
    minPerPage,
    Math.min(parsedPerPage, maxPerPage),
  );

  return {
    page: parsedPage,
    perPage: validatedPerPage,
  };
};
