const parseType = (type) => {
  const validTypes = ['work', 'home', 'personal'];
  if (typeof type === 'string' && validTypes.includes(type.toLowerCase())) {
    return type.toLowerCase();
  }
  return null;
};

const parseFavourite = (isFavourite) => {
  if (typeof isFavourite === 'string') {
    if (isFavourite.toLowerCase() === 'true') return true;
    if (isFavourite.toLowerCase() === 'false') return false;
  }
  return null;
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
