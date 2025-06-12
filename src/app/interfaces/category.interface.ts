import { Producto } from "./product.interface";

export interface Categoria {
  idcategoria?: number;
  descripcion?: string;
  productos: Producto[];
}
