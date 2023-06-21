import Filter from './components/Filter';
import ProductsTable from './components/ProductsTable';
import FilterProvider from './context/FilterContext';

function App() {
  return (
    <FilterProvider>
      <main className="container">
        <h1>Condition Editor</h1>
        <Filter />
        <ProductsTable />
      </main>
    </FilterProvider>
  );
}

export default App;
