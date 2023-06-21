import { properties } from '../store';
import { Operator, OperatorId, Property, PropertyType } from '../types';
import formatEnumToDropdownObject from '../utils/formatEnumToDropdownObject';

const OP_IDS = [OperatorId.EQUALS, OperatorId.ANY_OF];

const useFindEnumeratedOptions = (
  propertyFilter: Property | undefined,
  operatorFilter: Operator | undefined
) => {
  if (
    !propertyFilter ||
    !operatorFilter ||
    !OP_IDS.includes(operatorFilter?.id) ||
    propertyFilter.type !== PropertyType.ENUM
  )
    return [];

  const property = properties.find((prop) => prop.id === propertyFilter?.id);

  return formatEnumToDropdownObject(property?.values as string[]);
};

export default useFindEnumeratedOptions;
