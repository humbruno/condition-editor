import { useState, createContext, type ReactNode } from 'react';
import {
  type Operator,
  type Property,
  Product,
  EnumeratedFilterValue,
  OperatorId,
} from '../types';
import { products } from '../store';
import validateOperator from '../validatons/validateOperator';
import { MultiValue, SingleValue } from 'react-select';
import findOperatorById from '../utils/findOperatorById';
import findPropertyById from '../utils/findPropertyById';
import findPropertyValueByPropertyId from '../utils/findPropertyValueByPropertyId';

interface ContextProps {
  propertyFilter: Property | undefined;
  setPropertyFilter: React.Dispatch<React.SetStateAction<Property | undefined>>;
  operatorFilter: Operator | undefined;
  setOperatorFilter: React.Dispatch<React.SetStateAction<Operator | undefined>>;
  handleFilterSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  filterValue:
    | string
    | string[]
    | SingleValue<EnumeratedFilterValue>
    | MultiValue<EnumeratedFilterValue>;
  setFilterValue: React.Dispatch<
    React.SetStateAction<
      | string
      | SingleValue<EnumeratedFilterValue>
      | MultiValue<EnumeratedFilterValue>
      | string[]
    >
  >;
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
  const [filterValue, setFilterValue] = useState<
    | string
    | string[]
    | SingleValue<EnumeratedFilterValue>
    | MultiValue<EnumeratedFilterValue>
  >('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  function handleFilterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const filtered = products.filter((product) => {
      const property = findPropertyById(propertyFilter?.id as number);
      const operator = findOperatorById(operatorFilter?.id as OperatorId);
      const propertyValue = findPropertyValueByPropertyId({
        product,
        propertyId: property?.id as number,
      });

      if (!property || !operator) {
        return false;
      }

      return validateOperator({
        filterValue,
        operator,
        property,
        propertyValue,
      });
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
