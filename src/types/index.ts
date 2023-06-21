export type PropertyValue = {
  property_id: number;
  value: string | number;
};

export type Product = {
  id: number;
  property_values: PropertyValue[];
};

export enum PropertyType {
  STRING = 'string',
  NUMBER = 'number',
  ENUM = 'enumerated',
}

export type Property = {
  id: number;
  name: string;
  type: PropertyType;
  values?: string[];
};

export type Operator = {
  text: string;
  id: OperatorId;
};

export enum OperatorId {
  EQUALS = 'equals',
  GREATER_THAN = 'greater_than',
  LESS_THAN = 'less_than',
  ANY = 'any',
  NONE = 'none',
  ANY_OF = 'in',
  CONTAINS = 'contains',
}

export type EnumeratedFilterValue = {
  id: string;
  value: string;
  label: string;
};
