const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const validTypes = ['work', 'home', 'personal'];
  if (validTypes.includes(type)) {
    return type;
  }
};

const parseFavourite = (isFavourite) => {
  const isString = typeof isFavourite === 'string';
  if (!isString) return;

  if (isFavourite === 'true') return true;
  if (isFavourite === 'false') return false;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parseType(type);
  const parsedFavourite = parseFavourite(isFavourite);

  return {
    contactType: parsedType,
    isFavourite: parsedFavourite,
  };
};
