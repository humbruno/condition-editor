import Select, { SingleValue } from 'react-select';
import { properties } from '../store';
import { Property } from '../types';
import useFindPossibleOperators from '../hooks/useFindPossibleOperators';
import formatPropertyToDropdownObject from '../utils/formatPropertyToDropdownObject';

type Option = {
  id: number;
  value: string;
  label: string;
};

interface Props {
  propertyFilter: Property | undefined;
  setPropertyFilter: React.Dispatch<React.SetStateAction<Property | undefined>>;
}

const Filter = ({ setPropertyFilter, propertyFilter }: Props) => {
  const propertyOptions = formatPropertyToDropdownObject(properties);
  const operatorOptions = useFindPossibleOperators({ propertyFilter });
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
