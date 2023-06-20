import { OperatorId, PropertyType } from '../types';

export const operatorToPropertyMap = {
  [PropertyType.STRING]: [
    OperatorId.EQUALS,
    OperatorId.ANY,
    OperatorId.NONE,
    OperatorId.ANY_OF,
    OperatorId.CONTAINS,
  ],
  [PropertyType.NUMBER]: [
    OperatorId.EQUALS,
    OperatorId.GREATER_THAN,
    OperatorId.LESS_THAN,
    OperatorId.ANY,
    OperatorId.NONE,
    OperatorId.ANY_OF,
  ],
  [PropertyType.ENUM]: [
    OperatorId.EQUALS,
    OperatorId.ANY,
    OperatorId.NONE,
    OperatorId.ANY_OF,
  ],
};
