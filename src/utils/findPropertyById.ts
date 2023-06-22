import { properties } from '../store';

export default function findPropertyById(propertyId: number) {
  return properties.find((prop) => prop.id === propertyId);
}
