/**
 * Transformar CamelCase em Hyphen.
 *
 * @param {string} str
 */
const camelCaseToHyphen = (str) =>
  str.replace(/[A-Z]/g, (match) => "-" + match.toLocaleLowerCase());

export default camelCaseToHyphen;
