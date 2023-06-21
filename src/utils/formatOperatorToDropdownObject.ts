import type { Operator } from '../types';

export default function formatOperatorToDropdownObject(
  operatorArr: Operator[]
) {
  return operatorArr.map((op) => {
    return {
      id: op.id,
      value: op.text,
      label: op.text,
    };
  });
}
