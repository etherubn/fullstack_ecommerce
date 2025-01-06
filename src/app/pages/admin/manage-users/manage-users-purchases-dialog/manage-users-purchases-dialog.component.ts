import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-manage-users-purchases-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './manage-users-purchases-dialog.component.html',
  styleUrl: './manage-users-purchases-dialog.component.css'
})
export class ManageUsersPurchasesDialogComponent {

  constructor(
      @Inject(MAT_DIALOG_DATA) private id: number,
      private _dialogRef: MatDialogRef<ManageUsersPurchasesDialogComponent>,
      private userService: UserService
    ) { }

  close() {
    console.log('close dialog');
    this._dialogRef.close();
  }

}
