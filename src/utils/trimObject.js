export default (object) =>
  Object.keys(object).reduce(
    (accumulator, property) => ({
      ...accumulator,
      [property]:
        typeof object[property] === 'string'
          ? object[property].trim()
          : object[property],
    }),
    {}
  );
