import Filter from './components/Filter';
import FilterProvider from './context/FilterContext';

function App() {
  return (
    <FilterProvider>
      <Filter />
    </FilterProvider>
  );
}

export default App;
