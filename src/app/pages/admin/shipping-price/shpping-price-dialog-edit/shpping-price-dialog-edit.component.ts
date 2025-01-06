import { Component, Inject } from '@angular/core';
import { Shipping } from '../../../../model/shipping';
import { MaterialModule } from '../../../../material/material.module';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShippingService } from '../../../../services/shipping.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-shpping-price-dialog-edit',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './shpping-price-dialog-edit.component.html',
  styleUrl: './shpping-price-dialog-edit.component.css',
})
export class ShppingPriceDialogEditComponent {
  shipping: Shipping;

  constructor(
    // Inject the data passed to the dialog
    @Inject(MAT_DIALOG_DATA) private data: Shipping,
    private _dialogRef: MatDialogRef<ShppingPriceDialogEditComponent>,
    private shippingService: ShippingService
  ) {}

  ngOnInit(): void {
    this.shipping = { ...this.data };
  }

  operate() {
    if (this.shipping != null) {
      this.shippingService
        .updateShipping(this.shipping)
        .pipe(switchMap(() => this.shippingService.findAll()))
        .subscribe((data) => {
          this.shippingService.setShippingChange(data);
          this.shippingService.setMessageChange('UPDATED!');
        });
    }
    this.close(); 
  }

  close() {
    this._dialogRef.close();
  }

  isFormValid() {
    return !!this.shipping?.id;
    }
  

}
