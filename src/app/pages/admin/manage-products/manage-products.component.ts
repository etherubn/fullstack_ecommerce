import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { BrandService } from '../../../services/brand.service';
import { Category } from '../../../model/category';
import { Brand } from '../../../model/brand';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { ManageProductsDialogComponent } from './manage-products-dialog/manage-products-dialog.component';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../model/product';
import { MatTableDataSource } from '@angular/material/table';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, FormsModule],
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.css',
})
export class ManageProductsComponent {
  dataSource: MatTableDataSource<Product>;
  products : Product[];
  displayedColumns: string[] = [
    // 'idProduct',
    'category',
    'brand',
    'name',
    'price',
    'stock',
    // 'description',
    // 'refrigeration',
    // 'weight',
    'product_code',
    // 'code_branch',
    // 'pet_type',
    'image_product',
    // 'food_type'
    'actions',
  ];
  constructor(
    private _dialog: MatDialog,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productService.findAll().subscribe((data) => {
      this.products = data;
      this.createTable(this.products);
      console.log('products', this.products);
    });
  }

  createTable(data: Product[]) {
    this.dataSource = new MatTableDataSource(data);
    console.log('datasource', this.dataSource.filteredData);
  }

  openDialog() {
    this._dialog.open(ManageProductsDialogComponent, {
      width: '800px',
      height: '600px',
    });
  }

  openImageDialog(image?: string): void {
    this._dialog.open(ImageDialogComponent, {
      data: { image }
    });
  }

  // openImageDialog(imageUrl: string): void {
  //   const dialogRef = this.dialog.open(ImageDialogComponent, {
  //     data: { imageUrl }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }

}
