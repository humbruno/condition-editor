import '@testing-library/jest-dom';
import Select from 'react-select';
import { describe, test } from 'vitest';
import { render } from '@testing-library/react';
import selectEvent from 'react-select-event';
import { properties } from '../store';

const MOCK_OPTIONS = properties.map((prop) => {
  return {
    id: prop.id,
    label: prop.name,
    value: prop.name,
  };
});

describe('Select component', () => {
  test('has an empty state', async () => {
    const { getByTestId } = render(
      <form data-testid="form">
        <label htmlFor="properties">Properties</label>
        <Select options={MOCK_OPTIONS} name="properties" inputId="properties" />
      </form>
    );

    //empty select
    expect(getByTestId('form')).toHaveFormValues({ properties: '' });
  });

  test.each(MOCK_OPTIONS)(
    'should change the selected option to $label when the option is clicked',
    async (item) => {
      const { getByTestId, getByLabelText } = render(
        <form data-testid="form">
          <label htmlFor="properties">Properties</label>
          <Select
            options={MOCK_OPTIONS}
            name="properties"
            inputId="properties"
          />
        </form>
      );

      await selectEvent.select(getByLabelText('Properties'), item.value);

      expect(getByTestId('form')).toHaveFormValues({
        properties: item.value,
      });
    }
  );
});
