import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { Shipping } from '../../../model/shipping';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OrdersDialogComponent } from './orders-dialog/orders-dialog.component';
import { CategoryService } from '../../../services/category.service';
import { BrandService } from '../../../services/brand.service';
import { Category } from '../../../model/category';
import { Brand } from '../../../model/brand';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  // // dataSource: MatTableDataSource<Shipping>;
  // categories: Category[] = [];
  // brand: Brand[];

  // constructor(
  //   private _dialog: MatDialog,
  //   private categoryService: CategoryService,
  //   private brandService: BrandService
  // ) {}

  // ngOnInit() {
  //   this.categoryService.findAll().subscribe((data) => {
  //     console.log('data', data);
  //     this.categories = data;
  //     console.log('categories', this.categories.length);
  //   });

  //   this.brandService.findAll().subscribe((data) => {
  //     console.log('data', data);
  //     this.brand = data;
  //     console.log('brands', this.brand.length);
  //   });
  // }

  // openDialog() {
  //   this._dialog.open(OrdersDialogComponent, {
  //     width: '800px',
  //     height: '600px',
  //   });
  // }
}
