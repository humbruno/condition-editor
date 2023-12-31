import { useContext, useRef } from 'react';
import Select from 'react-select';
import { properties } from '../store';
import useFindPossibleOperators from '../hooks/useFindPossibleOperators';
import formatPropertyToDropdownObject from '../utils/formatPropertyToDropdownObject';
import { FilterContext } from '../context/FilterContext';
import { OperatorId, PropertyType } from '../types';
import useGetInputType from '../hooks/useGetInputType';
import useFindEnumeratedOptions from '../hooks/useFindEnumeratedOptions';

const Filter = () => {
  const {
    propertyFilter,
    operatorFilter,
    submitFilter,
    setFilterValue,
    changeProperty,
    changeOperator,
    clearFilter,
  } = useContext(FilterContext);

  const propertyRef = useRef(null);
  const valueSelectRef = useRef(null);
  const operatorRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  function clearSelect(ref: React.MutableRefObject<null>) {
    if (!ref.current) return;
    return ref.current.clearValue();
  }

  function clearInput() {
    if (!inputRef.current) return;
    inputRef.current.value = '';
  }

  return (
    <form className="form" onSubmit={submitFilter}>
      <label hidden htmlFor="properties">
        Properties
      </label>
      <Select
        name="properties"
        inputId="properties"
        placeholder="Select a Property"
        ref={propertyRef}
        onChange={(e) =>
          changeProperty(
            e,
            clearSelect(operatorRef),
            clearSelect(valueSelectRef)
          )
        }
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
            onChange={(e) =>
              changeOperator(e, clearSelect(valueSelectRef), clearInput())
            }
            options={operatorOptions}
          />
        </>
      )}

      {shouldRenderInput &&
        (propertyFilter?.type !== PropertyType.ENUM ? (
          <input
            ref={inputRef}
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
        <button
          type="button"
          onClick={() => clearFilter(clearSelect(propertyRef))}
        >
          Clear Filter
        </button>
      </div>
    </form>
  );
};

export default Filter;
