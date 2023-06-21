import { operators } from '../store';
import type { Operator, OperatorId, Property } from '../types';
import { operatorToPropertyMap } from '../utils';
import formatOperatorToDropdownObject from '../utils/formatOperatorToDropdownObject';

const useFindPossibleOperators = (propertyFilter: Property | undefined) => {
  if (!propertyFilter) return null;

  const possibleIds: OperatorId[] = operatorToPropertyMap[propertyFilter.type];

  const possibleOperatorsById = possibleIds.map((id) =>
    operators.find((op) => op.id === id)
  );

  if (!possibleOperatorsById) return null;

  return formatOperatorToDropdownObject(possibleOperatorsById as Operator[]);
};

export default useFindPossibleOperators;
