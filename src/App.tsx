import { useState } from 'react';
import Filter from './components/Filter';
import { Property } from './types';

function App() {
  const [propertyFilter, setPropertyFilter] = useState<Property | undefined>(
    undefined
  );

  return (
    <>
      <Filter
        propertyFilter={propertyFilter}
        setPropertyFilter={setPropertyFilter}
      />
    </>
  );
}

export default App;
