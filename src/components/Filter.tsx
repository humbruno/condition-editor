import { useContext } from 'react';
import Select, { SingleValue } from 'react-select';
import { operators, properties } from '../store';
import useFindPossibleOperators from '../hooks/useFindPossibleOperators';
import formatPropertyToDropdownObject from '../utils/formatPropertyToDropdownObject';
import { FilterContext } from '../context/FilterContext';
import { OperatorId } from '../types';
import useGetInputType from '../hooks/useGetInputType';

type PropertyOption = {
  id: number;
  value: string;
  label: string;
};

type OperatorOption = {
  id: OperatorId;
  value: string;
  label: string;
};

const Filter = () => {
  const {
    propertyFilter,
    setPropertyFilter,
    setOperatorFilter,
    operatorFilter,
  } = useContext(FilterContext);

  const propertyOptions = formatPropertyToDropdownObject(properties);
  const operatorOptions = useFindPossibleOperators(propertyFilter);
  const shouldShowOperatorDropdown = propertyFilter && operatorOptions;

  const input = useGetInputType({
    propertyFilter,
    operatorFilter,
  });

  const shouldRenderInput =
    input && input.needsInput && input.inputType && operatorFilter;

  function handlePropertyChange(e: SingleValue<PropertyOption>) {
    const selectedProperty = properties.find((prop) => prop.id === e?.id);
    setPropertyFilter(selectedProperty);
  }

  function handleOperatorChange(e: SingleValue<OperatorOption>) {
    const selectedOperator = operators.find((op) => op.id === e?.id);
    setOperatorFilter(selectedOperator);
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
          <Select onChange={handleOperatorChange} options={operatorOptions} />
        </label>
      )}
      {shouldRenderInput && <input type={input.inputType} />}
    </form>
  );
};

export default Filter;
