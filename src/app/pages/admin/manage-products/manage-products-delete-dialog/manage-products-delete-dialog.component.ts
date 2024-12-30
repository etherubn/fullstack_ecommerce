import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../../services/product.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-manage-products-delete-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './manage-products-delete-dialog.component.html',
  styleUrl: './manage-products-delete-dialog.component.css'
})
export class ManageProductsDeleteDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) private id: number,
    private _dialogRef: MatDialogRef<ManageProductsDeleteDialogComponent>,
    private productService: ProductService
  ) { }

  close() {
    console.log('close dialog');
    this._dialogRef.close();
  }

  delete() {
    console.log('delete product');
    this.productService.delete(this.id)
    .pipe(switchMap(() => this.productService.findAll()))
    .subscribe((data) => {
      this.productService.setProductChange(data);
      this.productService.setMessageChange('Product deleted');
    });
    this.close();
  }

}
