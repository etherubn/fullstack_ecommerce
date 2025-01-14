import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { FormErrorComponent } from "../../../common/components/form-error/form-error.component";
import { Form, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { LoginUser } from '../../../model/loginUser';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserStorageService } from '../../../services/user-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatIcon,
    MatButton,
    MatInputModule,
    MatFormFieldModule,
    FormErrorComponent,
    ReactiveFormsModule,
    CommonModule,
    MatSnackBarModule
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  
})
export class LoginComponent {
  hide=true
  loginForm:FormGroup
  usernameControl:FormControl<string> = new FormControl<string>("",[Validators.minLength(4),Validators.maxLength(12),Validators.required])
  passwordControl:FormControl<string> = new FormControl<string>("",[Validators.required])
  error:string= ""
  completar: Subject<string> = new Subject()

  constructor(
    private authService:AuthService,
    private fb:FormBuilder,
    private router:Router,
    private snackbar:MatSnackBar
  ){
    this.loginForm = this.fb.group({
      username:this.usernameControl,
      password:this.passwordControl
    })
  }

  sendForm(){
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value as LoginUser).subscribe({
        next: val=> {
          this.error=""
          console.log(val);
          this.snackbar.open("Usuario autenticado con éxito!!!",'Close',{duration:5000})
          this.router.navigateByUrl("")
        },
        error: err => {
          console.log(err);
          
          this.error= err 
        }
      }
      )
    }
  }
}
