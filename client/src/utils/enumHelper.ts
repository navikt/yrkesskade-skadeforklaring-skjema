export const getEnumKeyByEnumValue = (enumType: any, enumValue: any) => {
  let keys = Object.keys(enumType).filter((x) => enumType[x] === enumValue);
  return keys.length > 0 ? keys[0] : null;
};
