import { useContext, useRef } from 'react';
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

  const propertyRef = useRef(null);
  const valueSelectRef = useRef(null);
  const operatorRef = useRef(null);

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

    if (operatorRef.current) {
      operatorRef.current.clearValue();
      setOperatorFilter(undefined);
    }

    if (valueSelectRef.current) {
      valueSelectRef.current.clearValue();
      setFilterValue('');
    }
  }

  function handleOperatorChange(e: SingleValue<OperatorOption>) {
    const selectedOperator = operators.find((op) => op.id === e?.id);
    setOperatorFilter(selectedOperator);

    if (valueSelectRef.current) {
      valueSelectRef.current.clearValue();
      setFilterValue('');
    }
  }

  function handleClearForm() {
    if (!propertyRef.current) return;

    propertyRef.current.clearValue();
    setPropertyFilter(undefined);
    setFilterValue('');
    setOperatorFilter(undefined);
    setFilteredProducts(products);
  }

  return (
    <form className="form" onSubmit={handleFilterSubmit}>
      <label hidden htmlFor="properties">
        Properties
      </label>
      <Select
        name="properties"
        inputId="properties"
        placeholder="Select a Property"
        ref={propertyRef}
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
        <>
          <label hidden htmlFor="operator">
            Operator
          </label>
          <Select
            ref={operatorRef}
            name="operator"
            inputId="operator"
            placeholder="Select an Operator"
            onChange={handleOperatorChange}
            options={operatorOptions}
          />
        </>
      )}
      {shouldRenderInput &&
        (propertyFilter?.type !== PropertyType.ENUM ? (
          <input
            data-testid="input"
            placeholder="Value"
            onChange={(e) => setFilterValue(e.target.value)}
            type={input.inputType}
          />
        ) : (
          <>
            <label hidden htmlFor="value">
              Value
            </label>
            <Select
              ref={valueSelectRef}
              name="value"
              inputId="value"
              onChange={(e) => setFilterValue(e)}
              options={enumeratedOptions}
              isMulti={isMultiSelectInput}
            />
          </>
        ))}
      <div className="btnWrapper">
        <button
          data-testid="filter-btn"
          disabled={!propertyFilter || !operatorFilter}
          type="submit"
        >
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
