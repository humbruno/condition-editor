import { useState, createContext, type ReactNode } from 'react';
import {
  OperatorId,
  type Operator,
  type Property,
  PropertyType,
  Product,
} from '../types';
import { operators, products, properties } from '../store';
import validateOperator from '../validatons/validateOperator';

interface ContextProps {
  propertyFilter: Property | undefined;
  setPropertyFilter: React.Dispatch<React.SetStateAction<Property | undefined>>;
  operatorFilter: Operator | undefined;
  setOperatorFilter: React.Dispatch<React.SetStateAction<Operator | undefined>>;
  handleFilterSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  filterValue: string | string[];
  setFilterValue: React.Dispatch<React.SetStateAction<string | string[]>>;
  filteredProducts: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
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
  const [filterValue, setFilterValue] = useState<string | string[]>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  function handleFilterSubmit(e: React.FormEvent<HTMLFormElement>) {
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

      validateOperator({ operator, filterValue, property, propertyValue });
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
