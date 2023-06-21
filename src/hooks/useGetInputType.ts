import { Operator, OperatorId, Property, PropertyType } from '../types';

interface Props {
  propertyFilter: Property | undefined;
  operatorFilter: Operator | undefined;
}

const OPERATORS_WITHOUT_INPUT = [OperatorId.ANY, OperatorId.NONE];

const NUMBER_INPUT_OPERATORS = [
  OperatorId.EQUALS,
  OperatorId.GREATER_THAN,
  OperatorId.LESS_THAN,
];

const useGetInputType = ({ propertyFilter, operatorFilter }: Props) => {
  if (!propertyFilter || !operatorFilter) return null;

  const needsInput = !OPERATORS_WITHOUT_INPUT.includes(operatorFilter.id);

  const propertyTypeIsNumber = propertyFilter.type === PropertyType.NUMBER;

  const inputType =
    propertyTypeIsNumber && NUMBER_INPUT_OPERATORS.includes(operatorFilter.id)
      ? 'number'
      : 'text';

  return { needsInput, inputType };
};

export default useGetInputType;
