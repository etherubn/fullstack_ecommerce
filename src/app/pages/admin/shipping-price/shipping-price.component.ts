import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { Shipping } from '../../../model/shipping';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ShippingService } from '../../../services/shipping.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShppingPriceDialogEditComponent } from './shpping-price-dialog-edit/shpping-price-dialog-edit.component';

@Component({
  selector: 'app-shipping-price',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './shipping-price.component.html',
  styleUrl: './shipping-price.component.css'
})
export class ShippingPriceComponent {

  dataSource: MatTableDataSource<Shipping>;
  shippigs: Shipping[];

  displayedColumns = [
    { def: 'id', label: 'id', hide: true },
    { def: 'limit_price', label: 'limit_price', hide: false },
    { def: 'price', label: 'price', hide: false },
    { def: 'actions', label: 'actions', hide: false },
  ];

  constructor(
    private _dialog: MatDialog,
    private shippingService: ShippingService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.shippingService.findAll().subscribe((data) => {
      console.log('data', data);
      this.shippigs = data;
      this.createTable(this.shippigs);
      console.log('shippigs', this.shippigs);
    });

    this.shippingService.getShippingChange().subscribe((data) => {
      this.createTable(data);
    });

    this.shippingService.getMessageChange().subscribe((data) => {
      this._snackBar.open(data, 'Info', {
        duration: 2000,
      })
    });
  
  }

  createTable(data: Shipping[]) {
    this.dataSource = new MatTableDataSource(data);
    console.log('dataSourceShipping', this.dataSource.filteredData);
  }
  
  getDisplayedColumns() {
    return this.displayedColumns.filter((cd) => !cd.hide).map((cd) => cd.def);
  }

  openDialog(shipping?: Shipping):void {
    this._dialog.open(ShppingPriceDialogEditComponent, {
      width: '800px',
      height: '600px',
      data: shipping ,
    });
  }


}
