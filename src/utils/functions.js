export function getArrayFromObject(data) {
  if (!data) {
    return [];
  }
  return Object.keys(data).map(key => ({ ...data[key], id: key }));
}
