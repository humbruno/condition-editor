import { useContext } from 'react';
import Select, { SingleValue } from 'react-select';
import { operators, products, properties } from '../store';
import useFindPossibleOperators from '../hooks/useFindPossibleOperators';
import formatPropertyToDropdownObject from '../utils/formatPropertyToDropdownObject';
import { FilterContext } from '../context/FilterContext';
import { OperatorId, PropertyType } from '../types';
import useGetInputType from '../hooks/useGetInputType';
import useFindEnumeratedOptions from '../hooks/useFindEnumeratedOptions';

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
    handleFilterSubmit,
    setFilterValue,
    setFilteredProducts,
  } = useContext(FilterContext);

  const propertyOptions = formatPropertyToDropdownObject(properties);
  const operatorOptions = useFindPossibleOperators(propertyFilter);
  const shouldShowOperatorDropdown = propertyFilter && operatorOptions;

  const input = useGetInputType({
    propertyFilter,
    operatorFilter,
  });

  const enumeratedOptions = useFindEnumeratedOptions(
    propertyFilter,
    operatorFilter
  );

  const shouldRenderInput =
    input && input.needsInput && operatorFilter && input.inputType;

  const isMultiSelectInput = operatorFilter?.id === OperatorId.ANY_OF;

  function handlePropertyChange(e: SingleValue<PropertyOption>) {
    const selectedProperty = properties.find((prop) => prop.id === e?.id);
    setPropertyFilter(selectedProperty);
  }

  function handleOperatorChange(e: SingleValue<OperatorOption>) {
    const selectedOperator = operators.find((op) => op.id === e?.id);
    setOperatorFilter(selectedOperator);
  }

  function handleClearForm() {
    setPropertyFilter(undefined);
    setOperatorFilter(undefined);
    setFilteredProducts(products);
  }

  return (
    <form className="form" onSubmit={handleFilterSubmit}>
      <Select
        placeholder="Select a Property"
        onChange={handlePropertyChange}
        options={propertyOptions}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            textTransform: 'capitalize',
            minWidth: '150px',
          }),
          option: (baseStyles) => ({
            ...baseStyles,
            textTransform: 'capitalize',
          }),
        }}
      />
      {shouldShowOperatorDropdown && (
        <Select
          placeholder="Select an Operator"
          onChange={handleOperatorChange}
          options={operatorOptions}
        />
      )}
      {shouldRenderInput &&
        (propertyFilter?.type !== PropertyType.ENUM ? (
          <input
            placeholder="Value"
            onChange={(e) => setFilterValue(e.target.value)}
            type={input.inputType}
          />
        ) : (
          <Select
            onChange={(e) => setFilterValue(e)}
            options={enumeratedOptions}
            isMulti={isMultiSelectInput}
          />
        ))}
      <div className="btnWrapper">
        <button disabled={!propertyFilter || !operatorFilter} type="submit">
          Apply Filter
        </button>
        <button type="button" onClick={handleClearForm}>
          Clear Filter
        </button>
      </div>
    </form>
  );
};

export default Filter;
