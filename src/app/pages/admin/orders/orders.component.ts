import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Selling } from '../../../model/selling';
import { OrderService } from '../../../services/order.service';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [MaterialModule, FormsModule,CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  dataSource: MatTableDataSource<Selling>;
  sellings: Selling[];
  displayedColumns = [
    { def: 'id', label: 'id', hide: true },
    { def: 'username', label: 'username', hide: false },
    { def: 'creation_date', label: 'creation_date', hide: false },
    { def: 'selling_state', label: 'selling_state', hide: false },
    { def: 'actions', label: 'actions', hide: false },
  ];

  constructor(
    private ordenService: OrderService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.ordenService.findAll().subscribe((data) => {
      console.log('data', data);
      this.sellings = data;
      this.createTable(this.sellings);
      console.log('sellings', this.sellings);
    });

    this.ordenService.getOrderChange().subscribe((data) => {
      this.createTable(data);
    });

    this.ordenService.getMessageChange().subscribe((data) => {
      this._snackBar.open(data, 'Info', {
        duration: 2000,
      });
    });
  }

  createTable(data: Selling[]) {
    this.dataSource = new MatTableDataSource(data);
    console.log('dataSourceSelling', this.dataSource.filteredData);
  }

  getDisplayedColumns() {
    return this.displayedColumns.filter((cd) => !cd.hide).map((cd) => cd.def);
  }

  applyFilter(e: any) {
    console.log('e: ', e.target.value);
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  // changeState(selling: Selling) {
  //   console.log('changeState', selling);

  //   if (selling.selling_state === 'processing order') {
  //     selling.selling_state = 'sending order';
  //     this.ordenService
  //       .patch(selling.id, selling)
  //       .pipe(switchMap(() => this.ordenService.findAll()))
  //       .subscribe((data) => {
  //         this.ordenService.setOrderChange(data);
  //         this.ordenService.setMessageChange(
  //           'Order status updated to SENDING_ORDER'
  //         );
  //       });
  //   }

  //   // Verificar el estado actual de la orden
  //   else if (selling.selling_state === 'sending order') {
  //     // Actualizar al siguiente estado
  //     selling.selling_state = 'order delivered';

  //     this.ordenService
  //       .patch(selling.id, selling)
  //       .pipe(switchMap(() => this.ordenService.findAll()))
  //       .subscribe((data) => {
  //         this.ordenService.setOrderChange(data);
  //         this.ordenService.setMessageChange(
  //           'Order status updated to ORDER_DELIVERED'
  //         );
  //       });
  //   } else {
  //     console.log('Order status is not SENDING_ORDER, no update performed');
  //   }
  // }

  changeState(selling: Selling) {
    console.log('changeState', selling);

    const stateMap = {
      'processing order': {
        newState: 'sending order',
        message: 'ORDER STATUS UPDATED TO SENDING ORDER',
      },
      'sending order': {
        newState: 'order delivered',
        message: 'ORDER STATUS UPDATED TO ORDER DELIVERED',
      },
    };

    const stateInfo = stateMap[selling.selling_state];
    console.log('stateInfo', stateInfo);

    // Verificar si el estado de la orden es reconocido y actualizarlo al siguiente estado
    if (stateInfo) {
      selling.selling_state = stateInfo.newState;

      this.ordenService
        .patch(selling.id, selling)
        .pipe(switchMap(() => this.ordenService.findAll()))
        .subscribe((data) => {
          this.ordenService.setOrderChange(data);
          this.ordenService.setMessageChange(stateInfo.message);
        });
    } 
    // Si el estado de la orden no es reconocido se muestra un mensaje
    else {
      this.ordenService.setMessageChange(
        'ORDER ALREADY DELIVERED'
      );
    }
  }



}
