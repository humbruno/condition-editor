import { useState, createContext, type ReactNode } from 'react';
import {
  type Operator,
  type Property,
  Product,
  EnumeratedFilterValue,
  OperatorId,
  PropertyOption,
  OperatorOption,
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
  submitFilter: (e: React.FormEvent<HTMLFormElement>) => void;
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
  changeProperty: (e: SingleValue<PropertyOption>, ...rest: any[]) => void;
  changeOperator: (e: SingleValue<OperatorOption>, ...rest: any[]) => void;
  clearFilter: (..._rest: any) => void;
}

export const FilterContext = createContext<ContextProps>({
  propertyFilter: undefined,
  setPropertyFilter: () => null,
  operatorFilter: undefined,
  setOperatorFilter: () => null,
  submitFilter: () => null,
  filterValue: '',
  setFilterValue: () => null,
  filteredProducts: products,
  setFilteredProducts: () => null,
  changeProperty: () => null,
  changeOperator: () => null,
  clearFilter: () => null,
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function changeProperty(e: SingleValue<PropertyOption>, ..._rest: any) {
    const selectedProperty = findPropertyById(e?.id as number);
    setPropertyFilter(selectedProperty);
    setOperatorFilter(undefined);
    setFilterValue('');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function changeOperator(e: SingleValue<OperatorOption>, ..._rest: any) {
    const selectedOperator = findOperatorById(e?.id as OperatorId);
    setOperatorFilter(selectedOperator);
    setFilterValue('');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function clearFilter(..._rest: any) {
    setPropertyFilter(undefined);
    setFilterValue('');
    setOperatorFilter(undefined);
    setFilteredProducts(products);
  }

  function submitFilter(e: React.FormEvent<HTMLFormElement>) {
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
    submitFilter,
    filterValue,
    setFilterValue,
    filteredProducts,
    setFilteredProducts,
    changeProperty,
    changeOperator,
    clearFilter,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export default FilterProvider;
