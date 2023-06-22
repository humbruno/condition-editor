import { operators } from '../store';
import { OperatorId } from '../types';

export default function findOperatorById(operatorId: OperatorId) {
  return operators.find((op) => op.id === operatorId);
}
