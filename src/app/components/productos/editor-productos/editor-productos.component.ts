import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-editor-productos',
  templateUrl: './editor-productos.component.html',
  styleUrls: ['./editor-productos.component.scss']
})
export class EditorProductosComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      codigoBarra: ['', Validators.required],
      descripcion: ['', Validators.required],
      marca: ['', Validators.required],
      precio: ['', Validators.required],
      dCategoria: ['', Validators.maxLength(10)]
    })
  }
  ngOnInit(): void {
  }
  addProduct() {
    const product: Producto = {
      codigoBarra: this.form.value.codigoBarra,
      descripcion: this.form.value.descripcion,
      marca: this.form.value.marca,
      precio: this.form.value.precio,
      dCategoria: this.form.value.dCategoria,

    }
    console.log(product)
  }
}
