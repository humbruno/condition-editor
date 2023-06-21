import {
  Operator,
  OperatorId,
  Property,
  PropertyType,
  PropertyValue,
} from '../types';

interface Params {
  operator: Operator;
  property: Property;
  propertyValue: PropertyValue | undefined;
  filterValue: string | string[];
}

function validateOperator({
  operator,
  property,
  propertyValue,
  filterValue,
}: Params): boolean {
  switch (operator.id) {
    case OperatorId.EQUALS:
      return property.type !== PropertyType.ENUM
        ? propertyValue?.value.toString().toLowerCase() ===
            filterValue.toLowerCase()
        : propertyValue?.value.toString().toLowerCase() ===
            filterValue.id.toLowerCase();
    case OperatorId.GREATER_THAN:
      return Number(propertyValue?.value) > Number(filterValue);
    case OperatorId.LESS_THAN:
      return Number(propertyValue?.value) < Number(filterValue);
    case OperatorId.ANY:
      return !!propertyValue;
    case OperatorId.NONE:
      return !propertyValue;
    case OperatorId.ANY_OF:
      return property.type !== PropertyType.ENUM
        ? filterValue
            .split(',')
            .includes(propertyValue?.value.toString().toLowerCase())
        : filterValue.some(
            (item: { id: string; value: string; label: string }) =>
              item.value === propertyValue?.value
          );
    case OperatorId.CONTAINS:
      return String(propertyValue?.value)
        .toLowerCase()
        .includes(String(filterValue).toLowerCase());

    default:
      return false;
  }
}

export default validateOperator;
