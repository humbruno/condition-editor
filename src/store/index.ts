import {
  PropertyType,
  type Operator,
  type Product,
  type Property,
  OperatorId,
} from '../types';

export const products: Product[] = [
  {
    id: 0,
    property_values: [
      {
        property_id: 0,
        value: 'Headphones',
      },
      {
        property_id: 1,
        value: 'black',
      },
      {
        property_id: 2,
        value: 5,
      },
      {
        property_id: 3,
        value: 'electronics',
      },
      {
        property_id: 4,
        value: 'false',
      },
    ],
  },
  {
    id: 1,
    property_values: [
      {
        property_id: 0,
        value: 'Cell Phone',
      },
      {
        property_id: 1,
        value: 'black',
      },
      {
        property_id: 2,
        value: 3,
      },
      {
        property_id: 3,
        value: 'electronics',
      },
      {
        property_id: 4,
        value: 'true',
      },
    ],
  },
  {
    id: 2,
    property_values: [
      {
        property_id: 0,
        value: 'Keyboard',
      },
      {
        property_id: 1,
        value: 'grey',
      },
      {
        property_id: 2,
        value: 5,
      },
      {
        property_id: 3,
        value: 'electronics',
      },
      {
        property_id: 4,
        value: 'false',
      },
    ],
  },
  {
    id: 3,
    property_values: [
      {
        property_id: 0,
        value: 'Cup',
      },
      {
        property_id: 1,
        value: 'white',
      },
      {
        property_id: 2,
        value: 3,
      },
      {
        property_id: 3,
        value: 'kitchenware',
      },
    ],
  },
  {
    id: 4,
    property_values: [
      {
        property_id: 0,
        value: 'Key',
      },
      {
        property_id: 1,
        value: 'silver',
      },
      {
        property_id: 2,
        value: 1,
      },
      {
        property_id: 3,
        value: 'tools',
      },
    ],
  },
  {
    id: 5,
    property_values: [
      {
        property_id: 0,
        value: 'Hammer',
      },
      {
        property_id: 1,
        value: 'brown',
      },
      {
        property_id: 2,
        value: 19,
      },
      {
        property_id: 3,
        value: 'tools',
      },
    ],
  },
];

export const properties: Property[] = [
  {
    id: 0,
    name: 'Product Name',
    type: PropertyType.STRING,
  },
  {
    id: 1,
    name: 'color',
    type: PropertyType.STRING,
  },
  {
    id: 2,
    name: 'weight (oz)',
    type: PropertyType.NUMBER,
  },
  {
    id: 3,
    name: 'category',
    type: PropertyType.ENUM,
    values: ['tools', 'electronics', 'kitchenware'],
  },
  {
    id: 4,
    name: 'wireless',
    type: PropertyType.ENUM,
    values: ['true', 'false'],
  },
];

export const operators: Operator[] = [
  {
    text: 'Equals',
    id: OperatorId.EQUALS,
  },
  {
    text: 'Is greater than',
    id: OperatorId.GREATER_THAN,
  },
  {
    text: 'Is less than',
    id: OperatorId.LESS_THAN,
  },
  {
    text: 'Has any value',
    id: OperatorId.ANY,
  },
  {
    text: 'Has no value',
    id: OperatorId.NONE,
  },
  {
    text: 'Is any of',
    id: OperatorId.ANY_OF,
  },
  {
    text: 'Contains',
    id: OperatorId.CONTAINS,
  },
];
