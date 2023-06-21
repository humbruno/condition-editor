import { useState, createContext, type ReactNode } from 'react';
import type { Operator, Property } from '../types';

interface ContextProps {
  propertyFilter: Property | undefined;
  setPropertyFilter: React.Dispatch<React.SetStateAction<Property | undefined>>;
  operatorFilter: Operator | undefined;
  setOperatorFilter: React.Dispatch<React.SetStateAction<Operator | undefined>>;
}

export const FilterContext = createContext<ContextProps>({
  propertyFilter: undefined,
  setPropertyFilter: () => null,
  operatorFilter: undefined,
  setOperatorFilter: () => null,
});

const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [propertyFilter, setPropertyFilter] = useState<Property | undefined>(
    undefined
  );
  const [operatorFilter, setOperatorFilter] = useState<Operator | undefined>(
    undefined
  );

  const value = {
    propertyFilter,
    setPropertyFilter,
    operatorFilter,
    setOperatorFilter,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export default FilterProvider;
