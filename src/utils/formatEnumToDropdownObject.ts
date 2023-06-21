export default function formatEnumToDropdownObject(enumArr: string[]) {
  return enumArr.map((item) => {
    return {
      id: item,
      value: item,
      label: item,
    };
  });
}
