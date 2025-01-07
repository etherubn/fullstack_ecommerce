import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { ManageProductsDialogComponent } from './manage-products-dialog/manage-products-dialog.component';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../model/product';
import { MatTableDataSource } from '@angular/material/table';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { ManageProductsDeleteDialogComponent } from './manage-products-delete-dialog/manage-products-delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [MaterialModule,CommonModule],
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.css',
})
export class ManageProductsComponent {
  dataSource: MatTableDataSource<Product>;
  products : Product[];
  displayedColumns = [
    { def: 'idProduct', label: 'idProduct', hide: true },
    { def: 'category', label: 'category', hide: false },
    { def: 'brand', label: 'brand', hide: false },
    { def: 'name', label: 'name', hide: false },
    { def: 'price', label: 'price', hide: false },
    { def: 'stock', label: 'stock', hide: false },
    { def: 'product_code', label: 'product_code', hide: false },
    { def: 'image_product', label: 'image_product', hide: false },
    { def: 'actions', label: 'actions', hide: false },
  ];

  constructor(
    private _dialog: MatDialog,
    private productService: ProductService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.productService.findAll().subscribe((data) => {
      console.log('data', data);
      this.products = data;
      this.createTable(this.products);
      console.log('products', this.products);
    });
    
    this.productService.getProductChange().subscribe((data) => {
      this.createTable(data);
    });

    this.productService.getMessageChange().subscribe((data) => {
      this._snackBar.open(data, 'Info', {
        duration: 2000,
      })
    });


  }

  createTable(data: Product[]) {
    this.dataSource = new MatTableDataSource(data);
    console.log('datasource', this.dataSource.filteredData);

    
    this.dataSource.filterPredicate = (data: Product, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();
      const category = data.category?.type?.toLowerCase() || '';
      const brand = data.brand?.name?.toLowerCase() || '';
      const name = data.name?.toLowerCase() || '';
      const price = data.price?.toString() || '';
      const stock = data.stock?.toString() || '';
      const productCode = data.product_code?.toLowerCase() || '';

      return (
        category.includes(transformedFilter) ||
        brand.includes(transformedFilter) ||
        name.includes(transformedFilter) ||
        price.includes(transformedFilter) ||
        stock.includes(transformedFilter) ||
        productCode.includes(transformedFilter)
      );
    };
  }

  openDialog(product?:Product):void  {
    console.log('productOpen', product);
    this._dialog.open(ManageProductsDialogComponent, {
      width: '800px',
      height: '600px',
      data: product ,
    });
  }

  getDisplayedColumns() {
    return this.displayedColumns.filter((cd) => !cd.hide).map((cd) => cd.def);
  }

  openImageDialog(image?: string): void {
    this._dialog.open(ImageDialogComponent, {
      data: { image }
    });
  }

  delete(idProduct?: number) {
    console.log("id",idProduct);
    this._dialog.open(ManageProductsDeleteDialogComponent, {
      width: '200px',
      data: idProduct
    });
  }

  applyFilter(e: any) {
    console.log('e: ', e.target.value);
    this.dataSource.filter = e.target.value.trim().toLowerCase();
    }

}
