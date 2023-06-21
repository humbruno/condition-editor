import { useContext } from 'react';
import { properties } from '../store';
import { FilterContext } from '../context/FilterContext';
import { Product } from '../types';

const ProductsTable = () => {
  const { filteredProducts } = useContext(FilterContext);

  return (
    <table>
      <thead>
        <tr>
          {properties.map((property) => (
            <th
              style={{
                width: `calc(100% / ${properties.length})`,
                border: '1px solid red',
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
            {product.property_values.map((propertyValue, index) => (
              <td
                style={{
                  textAlign: 'center',
                  width: `calc(100% / ${properties.length})`,
                  border: '1px solid blue',
                }}
                key={index}
              >
                {propertyValue.value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
