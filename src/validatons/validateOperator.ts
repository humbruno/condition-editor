import { MultiValue, SingleValue } from 'react-select';
import {
  EnumeratedFilterValue,
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
  filterValue:
    | string
    | string[]
    | SingleValue<EnumeratedFilterValue>
    | MultiValue<EnumeratedFilterValue>;
}

function validateOperator({
  operator,
  property,
  propertyValue,
  filterValue,
}: Params): boolean {
  const isEnumerated = property.type === PropertyType.ENUM;

  const propertyValueMatchesFilterValue =
    String(propertyValue?.value).toLowerCase() ===
    String(filterValue).toLowerCase();

  const objFilterValue = filterValue as EnumeratedFilterValue;

  const propertyValueMatchesFilterValueId =
    String(propertyValue?.value).toLowerCase() === objFilterValue.id;

  switch (operator.id) {
    case OperatorId.EQUALS:
      return !isEnumerated
        ? propertyValueMatchesFilterValue
        : propertyValueMatchesFilterValueId;
    case OperatorId.GREATER_THAN:
      return Number(propertyValue?.value) > Number(filterValue);
    case OperatorId.LESS_THAN:
      return Number(propertyValue?.value) < Number(filterValue);
    case OperatorId.ANY:
      return !!propertyValue;
    case OperatorId.NONE:
      return !propertyValue;
    case OperatorId.ANY_OF:
      return !isEnumerated && typeof filterValue === 'string'
        ? filterValue
            .split(',')
            .includes(String(propertyValue?.value).toLowerCase())
        : Array(filterValue).some((item: any) => {
            item?.value === propertyValue?.value;
          });
    case OperatorId.CONTAINS:
      return String(propertyValue?.value)
        .toLowerCase()
        .includes(String(filterValue).toLowerCase());

    default:
      return false;
  }
}

export default validateOperator;
