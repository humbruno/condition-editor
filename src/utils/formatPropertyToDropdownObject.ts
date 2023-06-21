import type { Property } from '../types';

export default function formatPropertyToDropdownObject(
  propertyArr: Property[]
) {
  return propertyArr.map((prop) => {
    return {
      id: prop.id,
      value: prop.name,
      label: prop.name,
    };
  });
}
