import { Component } from '@angular/core';
import { MaterialModule } from '../../../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders-dialog',
  standalone: true,
  imports: [MaterialModule,FormsModule,ReactiveFormsModule],
  templateUrl: './orders-dialog.component.html',
  styleUrl: './orders-dialog.component.css'
})
export class OrdersDialogComponent {

}
