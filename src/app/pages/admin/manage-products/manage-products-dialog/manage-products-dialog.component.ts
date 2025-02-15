import { Component, Inject } from '@angular/core';
import { Category } from '../../../../model/category';
import { Brand } from '../../../../model/brand';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../../services/category.service';
import { BrandService } from '../../../../services/brand.service';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material/material.module';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../model/product';
import { ProductService } from '../../../../services/product.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-manage-products-dialog',
  standalone: true,
  imports: [MaterialModule, FormsModule, CommonModule],
  templateUrl: './manage-products-dialog.component.html',
  styleUrl: './manage-products-dialog.component.css',
})
export class ManageProductsDialogComponent {
  categories: Category[] = [];
  brands: Brand[];
  isEdit = false;
  product: Product = {
    idProduct: 0,
    type: '',
    code_branch: '',
    product_code: '',
    name: '',
    price: null,
    stock: null,
    description: '',
    category: { id: 0, type: '' },
    brand: { id: 0, name: '' },
    pet_type: '',
    image_product: '',
    // food
    weight: null,
    refrigeration: null,
    food_type: '',
    // accesory
    hypoallergenic: null,
    accesory_type: '',
    // hygiene
    volume: null,
    hygiene_type: '',
  };

  selectedCategory: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Product,
    private _dialogRef: MatDialogRef<ManageProductsDialogComponent>,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    console.log('dataEdit', this.data);
    if (this.data != null) {
      this.data.type = this.onCategoryType(this.data.category.id);
      this.product = { ...this.data };
      this.isEdit = true;
    }
    console.log('productEdit', this.product);
    this.categoryService.findAll().subscribe((data) => {
      console.log('data', data);
      this.categories = data;
      console.log('categories', this.categories);
    });

    this.brandService.findAll().subscribe((data) => {
      console.log('data', data);
      this.brands = data;
      console.log('brands', this.brands);
    });
  }

  onCategoryType(categoryId: number) {
    const categoryTypeMap = {
      1: 'food',
      2: 'accesory',
      3: 'hygiene',
    };
    // retornar tipo de producto según la categoría seleccionada o vacío si no existe
    return categoryTypeMap[categoryId] || '';
  }

  onCategoryChange(categoryId: number) {
    this.selectedCategory = categoryId;
    const categoryTypeMap = {
      1: 'food',
      2: 'accesory',
      3: 'hygiene',
    };
    // Asignar tipo de producto según la categoría seleccionada
    this.product.type = categoryTypeMap[categoryId] || '';

    // Limpiar campos específicos según la categoría seleccionada
    this.clearFields();
  }

  isFormValid(): boolean {
    if (
      !this.product.code_branch ||
      !this.product.name ||
      !this.product.price ||
      !this.product.stock ||
      !this.product.description ||
      !this.product.pet_type ||
      !this.product.image_product
    ) {
      return false;
    }

    if (this.selectedCategory === 1) {
      return (
        !!this.product.food_type &&
        !!this.product.weight &&
        this.product.refrigeration !== null
      );
    } else if (this.selectedCategory === 2) {
      return (
        !!this.product.accesory_type && this.product.hypoallergenic !== null
      );
    } else if (this.selectedCategory === 3) {
      return !!this.product.hygiene_type && !!this.product.volume;
    }

    return true;
  }

  // Limpiando todos los campos de producto cuando se cambia de categoría
  clearFields() {
    this.product.accesory_type = '';
    this.product.hypoallergenic = null;
    this.product.food_type = '';
    this.product.weight = null;
    this.product.refrigeration = null;
    this.product.hygiene_type = '';
    this.product.volume = null;
  }

  operate() {
    if (this.product != null && this.product.idProduct > 0) {
      //UPDATE
      this.productService
        .update(this.product.idProduct, this.product)
        .pipe(switchMap(() => this.productService.findAll()))
        .subscribe((data) => {
          this.productService.setProductChange(data);
          this.productService.setMessageChange('UPDATED!');
        });
    } else {
      console.log(this.product);
      this.productService
        .save(this.product)
        .pipe(switchMap(() => this.productService.findAll()))
        .subscribe((data) => {
          this.productService.setProductChange(data);
          this.productService.setMessageChange('Product saved');
        });
    }
    this.close();
  }

  close() {
    this._dialogRef.close();
  }

  ngDoCheck() {
    console.log(this.product);
  }
}
