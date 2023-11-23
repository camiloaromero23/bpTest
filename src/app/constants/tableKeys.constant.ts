import { Product } from "../pages/product.service";

type ProductWithoutId = Omit<Product, 'id'>;

type ITableKeys = {
  [key in keyof ProductWithoutId]: string;
};

export const tableKeys: ITableKeys = {
  logo: 'Logo',
  name: 'Nombre del producto',
  description: 'Descripción',
  date_release: 'Fecha de liberación',
  date_revision: 'Fecha de reestructuración',
};

export const tableHeaders = [
  tableKeys.logo,
  tableKeys.name,
  tableKeys.description,
  tableKeys.date_release,
  tableKeys.date_revision,
]
