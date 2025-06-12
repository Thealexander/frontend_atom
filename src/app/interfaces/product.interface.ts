import { Categoria } from "./category.interface";

export interface Producto {
  idProducto?: number;
  codigoBarra?: string;
  descripcion: string;
  marca?: string;
  idCategoria?: number;
  precio?: number;
  dCategoria?: Categoria;
}
