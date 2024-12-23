import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { Shipping } from '../../../model/shipping';
import { MatTableDataSource } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  // dataSource: MatTableDataSource<Shipping>;

  // ngOnInit() {
  //   this.dataSource = new MatTableDataSource<Shipping>([]);
  // }


}
