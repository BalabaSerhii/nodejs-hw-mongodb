const parseType = (type) => {
  if (typeof type !== 'string') {
    return undefined;
  }

  const validTypes = ['work', 'home', 'personal'];
  return validTypes.includes(type) ? type : undefined;
};

const parseFavourite = (isFavourite) => {
  if (typeof isFavourite !== 'string') {
    return undefined;
  }

  switch (isFavourite.toLowerCase()) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return undefined;
  }
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


///////////////////////////