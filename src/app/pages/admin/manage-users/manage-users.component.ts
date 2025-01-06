import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { CommonModule } from '@angular/common';
import { User } from '../../../model/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ManageUsersDeleteDialogComponent } from './manage-users-delete-dialog/manage-users-delete-dialog.component';
import { ManageUsersPurchasesDialogComponent } from './manage-users-purchases-dialog/manage-users-purchases-dialog.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css',
})
export class UsersComponent {
  dataSource: MatTableDataSource<User>;
  users: User[];
  displayedColumns = [
    { def: 'id', label: 'id', hide: true },
    { def: 'username', label: 'username', hide: false },
    { def: 'email', label: 'email', hide: false },
    { def: 'role', label: 'role', hide: false },
    { def: 'actions', label: 'actions', hide: false },
  ];

  constructor(
    private _dialog: MatDialog,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.userService.findAll().subscribe((data) => {
      console.log("findAll");
      console.log('data', data);
      this.users = data;
      this.createTable(this.users);
      console.log('users', this.users);
    });
    this.userService.getUserChange().subscribe((data) => {
      console.log("getUserChange");
      this.createTable(data);
    });

    this.userService.getMessageChange().subscribe((data) => {
      this._snackBar.open(data, 'Info', {
        duration: 2000,
      });
    });
  }

  createTable(data: User[]) {
    this.dataSource = new MatTableDataSource(data);
    console.log('dataSourceUser', this.dataSource.filteredData);

    this.dataSource.filterPredicate = (data: User, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();
      console.log('transformedFilter:', transformedFilter);
      const roles = data.role?.map((r) => r.type.toLowerCase()) || [];
      console.log('roles:', roles);
      const email = data.email?.toLowerCase() || '';
      const username = data.username?.toLowerCase() || '';
      return (
        roles.some((role) => role.includes(transformedFilter)) || // Verifica cada rol individualmente
        email.includes(transformedFilter) ||
        username.includes(transformedFilter)
      );
    };
  }

  getDisplayedColumns() {
    return this.displayedColumns.filter((cd) => !cd.hide).map((cd) => cd.def);
  }

  delete(id?: number) {
    console.log('delete', id);
    this._dialog.open(ManageUsersDeleteDialogComponent, {
      width: '200px',
      data: id,
    });
  }

  applyFilter(e: any) {
    console.log('e: ', e.target.value);
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  viewPurchases(id?: number) {
    console.log('view purchases');

    this._dialog.open(ManageUsersPurchasesDialogComponent, {
      width: '800px',
      height: '600px',
      data: id,
    });

    // const purchases = this.getPurchases(userId); // Implementa esta función para obtener las compras del usuario
    // const dialogRef = this.dialog.open(UserPurchasesDialogComponent, {
    //   width: '250px',
    //   data: { purchases }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }
}
