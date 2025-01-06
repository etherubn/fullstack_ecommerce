import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../../services/user.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-manage-users-delete-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './manage-users-delete-dialog.component.html',
  styleUrl: './manage-users-delete-dialog.component.css'
})
export class ManageUsersDeleteDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) private id: number,
    private _dialogRef: MatDialogRef<ManageUsersDeleteDialogComponent>,
    private userService: UserService
  ) { }

  close() {
    console.log('close dialog');
    this._dialogRef.close();
  }

  delete() {
    console.log('delete user');
    this.userService.delete(this.id)
        .pipe(switchMap(() => this.userService.findAll()))
        .subscribe((data) => {
          this.userService.setUserChange(data);
          this.userService.setMessageChange('User deleted');
        });
        this.close();
  }



}
