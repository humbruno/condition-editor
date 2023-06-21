import Filter from './components/Filter';
import ProductsTable from './components/ProductsTable';
import FilterProvider from './context/FilterContext';

function App() {
  return (
    <FilterProvider>
      <Filter />
      <ProductsTable />
    </FilterProvider>
  );
}

export default App;
