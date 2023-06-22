import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import selectEvent from 'react-select-event';
import { describe, test } from 'vitest';
import App from './App';
import { products, properties, operators } from './store';
import { OperatorId, PropertyType } from './types';

const PRODUCT = products[0];
const EQUALS_OPERATOR = operators.find(
  (op) => op.id === OperatorId.EQUALS
)?.text;

describe('App', () => {
  test('has a table element on initial render', () => {
    const { getByTestId } = render(<App />);

    // table has been rendered
    expect(getByTestId('table')).toBeInTheDocument();
  });

  test.each(products)(
    'renders the table with the initial produts',
    (product) => {
      const { getByText } = render(<App />);

      const productName = product.property_values[0].value;

      // each product name is in the DOM
      expect(getByText(productName)).toBeInTheDocument();
    }
  );
});

describe('EQUALS operator', () => {
  test.each(properties)(
    'filters the table for each property',
    async (property) => {
      const { getByLabelText, getByTestId } = render(<App />);

      const tableRows = document.querySelectorAll('table tbody tr');
      const submitButton = getByTestId('filter-btn');

      const propertyValue = PRODUCT.property_values.find(
        (value) => value.property_id === property?.id
      );

      if (!propertyValue || !EQUALS_OPERATOR) return;

      await selectEvent.select(getByLabelText('Properties'), property.name);
      await selectEvent.select(getByLabelText('Operator'), EQUALS_OPERATOR);

      if (property.type !== PropertyType.ENUM) {
        const input = getByTestId('input');
        fireEvent.change(input, { target: { value: propertyValue } });
        fireEvent(submitButton, new MouseEvent('click'));
      } else {
        await selectEvent.select(
          getByLabelText('Value'),
          property.values ? property.values[0] : ''
        );
      }

      expect(tableRows[0]).toHaveTextContent(String(propertyValue.value));
    }
  );
});
