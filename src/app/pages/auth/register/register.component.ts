import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { FormErrorComponent } from "../../../common/components/form-error/form-error.component";
import { AuthService } from '../../../services/auth.service';
import { validadoEmail, validadorNombre } from '../../../common/validators/validator';
import { RegisterUser } from '../../../model/registerUser';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatIcon,
    MatButton,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatSnackBarModule,
    FormErrorComponent,
    
],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  
})
export class RegisterComponent { 
  hide = true;
  
  registerForm:FormGroup
  usernameControl:FormControl<string> = new FormControl<string>("",[Validators.required,Validators.minLength(4),Validators.maxLength(12)],[validadorNombre()])
  emailControl:FormControl<string> = new FormControl<string>("",[Validators.required,Validators.email],[validadoEmail()])
  passwordControl: FormControl<string> = new FormControl<string>("",[Validators.required])
 

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private authService:AuthService,
    private snackbar: MatSnackBar
  ){
    this.registerForm = this.fb.group({
      username: this.usernameControl,
      email: this.emailControl,
      password:this.passwordControl
    })
  }

  sendForm(){
    if(this.registerForm.valid){
      this.authService.register(this.registerForm.value as RegisterUser).subscribe((val)=>{
        this.snackbar.open(val,'Close',{duration:5000})
      })
      this.router.navigateByUrl('/auth/sign-up')
    }
  }

}
