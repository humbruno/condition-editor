import { useState, createContext, type ReactNode } from 'react';
import {
  OperatorId,
  type Operator,
  type Property,
  PropertyType,
} from '../types';
import { operators, products, properties } from '../store';

interface ContextProps {
  propertyFilter: Property | undefined;
  setPropertyFilter: React.Dispatch<React.SetStateAction<Property | undefined>>;
  operatorFilter: Operator | undefined;
  setOperatorFilter: React.Dispatch<React.SetStateAction<Operator | undefined>>;
  handleFilterSubmit: (e: any) => void;
  filterValue: any;
  setFilterValue: React.Dispatch<React.SetStateAction<any>>;
  filteredProducts: any;
  setFilteredProducts: any;
}

export const FilterContext = createContext<ContextProps>({
  propertyFilter: undefined,
  setPropertyFilter: () => null,
  operatorFilter: undefined,
  setOperatorFilter: () => null,
  handleFilterSubmit: () => null,
  filterValue: '',
  setFilterValue: () => null,
  filteredProducts: products,
  setFilteredProducts: () => null,
});

const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [propertyFilter, setPropertyFilter] = useState<Property | undefined>(
    undefined
  );
  const [operatorFilter, setOperatorFilter] = useState<Operator | undefined>(
    undefined
  );
  const [filterValue, setFilterValue] = useState<any>('');
  const [filteredProducts, setFilteredProducts] = useState<any>(products);

  function handleFilterSubmit(e: any) {
    e.preventDefault();

    const filtered = products.filter((product) => {
      const property = properties.find(
        (prop) => prop.id === propertyFilter?.id
      );

      const operator = operators.find((op) => op.id === operatorFilter?.id);

      const propertyValue = product.property_values.find(
        (value) => value.property_id === property?.id
      );

      if (!property || !operator) {
        return false;
      }

      switch (operator.id) {
        case OperatorId.EQUALS:
          return property.type !== PropertyType.ENUM
            ? propertyValue?.value.toString().toLowerCase() ===
                filterValue.toLowerCase()
            : propertyValue?.value.toString().toLowerCase() ===
                filterValue.id.toLowerCase();
        case OperatorId.GREATER_THAN:
          return Number(propertyValue?.value) > Number(filterValue);
        case OperatorId.LESS_THAN:
          return Number(propertyValue?.value) < Number(filterValue);
        case OperatorId.ANY:
          return propertyValue;
        case OperatorId.NONE:
          return !propertyValue;
        case OperatorId.ANY_OF:
          return property.type !== PropertyType.ENUM
            ? filterValue
                .split(',')
                .includes(propertyValue?.value.toString().toLowerCase())
            : filterValue.some(
                (item: { id: string; value: string; label: string }) =>
                  item.value === propertyValue?.value
              );
        case OperatorId.CONTAINS:
          return String(propertyValue?.value)
            .toLowerCase()
            .includes(String(filterValue).toLowerCase());

        default:
          return false;
      }
    });

    setFilteredProducts(filtered);
  }

  const value = {
    propertyFilter,
    setPropertyFilter,
    operatorFilter,
    setOperatorFilter,
    handleFilterSubmit,
    filterValue,
    setFilterValue,
    filteredProducts,
    setFilteredProducts,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export default FilterProvider;
