import { useContext } from 'react';
import Select, { SingleValue } from 'react-select';
import { properties } from '../store';
import useFindPossibleOperators from '../hooks/useFindPossibleOperators';
import formatPropertyToDropdownObject from '../utils/formatPropertyToDropdownObject';
import { FilterContext } from '../context/FilterContext';

type Option = {
  id: number;
  value: string;
  label: string;
};

const Filter = () => {
  const { propertyFilter, setPropertyFilter } = useContext(FilterContext);

  const propertyOptions = formatPropertyToDropdownObject(properties);
  const operatorOptions = useFindPossibleOperators(propertyFilter);
  const shouldShowOperatorDropdown = propertyFilter && operatorOptions;

  function handlePropertyChange(e: SingleValue<Option>) {
    const selectedProperty = properties.find(
      (property) => property.id === e?.id
    );

    setPropertyFilter(selectedProperty);
  }

  return (
    <form>
      <label>
        Property
        <Select onChange={handlePropertyChange} options={propertyOptions} />
      </label>
      {shouldShowOperatorDropdown && (
        <label>
          Operator
          <Select options={operatorOptions} />
        </label>
      )}
    </form>
  );
};

export default Filter;
