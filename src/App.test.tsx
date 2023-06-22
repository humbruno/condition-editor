import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import selectEvent from 'react-select-event';
import { describe, test } from 'vitest';
import App from './App';
import { products, properties } from './store';
import { OperatorId, PropertyType } from './types';
import findOperatorById from './utils/findOperatorById';

const PRODUCT = products[0];

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

      const OPERATOR = findOperatorById(OperatorId.EQUALS)?.text;
      const tableRows = document.querySelectorAll('table tbody tr');
      const submitButton = getByTestId('filter-btn');

      const propertyValue = PRODUCT.property_values.find(
        (value) => value.property_id === property?.id
      );

      if (!propertyValue || !OPERATOR) return;

      await selectEvent.select(getByLabelText('Properties'), property.name);
      await selectEvent.select(getByLabelText('Operator'), OPERATOR);

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

describe('GREATER_THAN operator', () => {
  test.each(properties)(
    'filters the table properties of number type',
    async (property) => {
      if (property.type !== PropertyType.NUMBER) return;

      const { getByLabelText, getByTestId } = render(<App />);

      const OPERATOR = findOperatorById(OperatorId.GREATER_THAN)?.text;
      const tableRows = document.querySelectorAll('table tbody tr');
      const submitButton = getByTestId('filter-btn');

      const propertyValue = PRODUCT.property_values.find(
        (value) => value.property_id === property?.id
      );

      if (!propertyValue || !OPERATOR) return;

      await selectEvent.select(getByLabelText('Properties'), property.name);
      await selectEvent.select(getByLabelText('Operator'), OPERATOR);

      const input = getByTestId('input');
      fireEvent.change(input, { target: { value: propertyValue } });
      fireEvent(submitButton, new MouseEvent('click'));

      expect(tableRows[0]).toHaveTextContent(String(propertyValue.value));
    }
  );
});

describe('LESS_THAN operator', () => {
  test.each(properties)(
    'filters the table properties of number type',
    async (property) => {
      if (property.type !== PropertyType.NUMBER) return;

      const { getByLabelText, getByTestId } = render(<App />);

      const OPERATOR = findOperatorById(OperatorId.LESS_THAN)?.text;
      const tableRows = document.querySelectorAll('table tbody tr');
      const submitButton = getByTestId('filter-btn');

      const propertyValue = PRODUCT.property_values.find(
        (value) => value.property_id === property?.id
      );

      if (!propertyValue || !OPERATOR) return;

      await selectEvent.select(getByLabelText('Properties'), property.name);
      await selectEvent.select(getByLabelText('Operator'), OPERATOR);

      const input = getByTestId('input');
      fireEvent.change(input, { target: { value: propertyValue } });
      fireEvent(submitButton, new MouseEvent('click'));

      expect(tableRows[0]).toHaveTextContent(String(propertyValue.value));
    }
  );
});

describe('ANY operator', () => {
  test.each(properties)(
    'filters the table for properties that have any value',
    async (property) => {
      const { getByLabelText, getByTestId } = render(<App />);

      const OPERATOR = findOperatorById(OperatorId.ANY)?.text;
      const tableRows = document.querySelectorAll('table tbody tr');
      const submitButton = getByTestId('filter-btn');

      if (!OPERATOR) return;

      await selectEvent.select(getByLabelText('Properties'), property.name);
      await selectEvent.select(getByLabelText('Operator'), OPERATOR);

      fireEvent(submitButton, new MouseEvent('click'));

      expect(tableRows[0]).toBeInTheDocument();
    }
  );
});

describe('NONE operator', () => {
  test.each(properties)(
    'filters the table for properties without a value',
    async (property) => {
      const { getByLabelText, getByTestId } = render(<App />);

      const OPERATOR = findOperatorById(OperatorId.NONE)?.text;
      const submitButton = getByTestId('filter-btn');

      const propertyValue = PRODUCT.property_values.find(
        (value) => value.property_id === property?.id
      );

      if (!OPERATOR) return;

      await selectEvent.select(getByLabelText('Properties'), property.name);
      await selectEvent.select(getByLabelText('Operator'), OPERATOR);

      fireEvent(submitButton, new MouseEvent('click'));

      expect(getByTestId('table')).not.toHaveTextContent(
        String(propertyValue?.value)
      );
    }
  );
});
