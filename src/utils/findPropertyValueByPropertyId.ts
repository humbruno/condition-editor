import { Product } from '../types';

interface Params {
  propertyId: number;
  product: Product;
}

export default function findPropertyValueByPropertyId({
  propertyId,
  product,
}: Params) {
  return product.property_values.find(
    (value) => value.property_id === propertyId
  );
}
