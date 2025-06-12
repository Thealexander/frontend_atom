import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';
//import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})

export class ProductosComponent implements OnInit {

  listProducts: Producto[] = []

  constructor(private _productService: ProductService) {

  }
  ngOnInit(): void {
    this.getListProducts()
  }

  getListProducts() {
    this._productService.getListProducts().subscribe((data) => {
      this.listProducts = data;
    })
  }
}
