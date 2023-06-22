import { useContext } from 'react';
import { properties } from '../store';
import { FilterContext } from '../context/FilterContext';
import { Product } from '../types';

const ProductsTable = () => {
  const { filteredProducts } = useContext(FilterContext);

  return (
    <table data-testid="table" className="table">
      <thead>
        <tr>
          {properties.map((property) => (
            <th
              style={{
                width: `calc(100% / ${properties.length})`,
              }}
              key={property.id}
            >
              {property.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredProducts.map((product: Product) => (
          <tr key={product.id}>
            {product.property_values.map((propertyValue) => (
              <td
                style={{
                  width: `calc(100% / ${properties.length})`,
                }}
                key={propertyValue.property_id}
              >
                {propertyValue.value}
              </td>
            ))}
            {product.property_values.length < properties.length && <td />}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
