import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, public userService: UserService, public snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.value.email != undefined) {
      this.userService.getUser(this.loginForm.value.email).then((res: any) => {
        if (res.length == 0) {
          this.snackbar.open('Account does not exists!', 'ok')
        } else {
          if (res[0].password == this.loginForm.value.password) {
            this.snackbar.open('Login successfull', 'ok')
            this.userService.user = res[0];
            localStorage.setItem('user', JSON.stringify(res[0]));
            this.router.navigate(['/posts'])
          } else {
            this.snackbar.open('Incorrect password', 'ok')
          }
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  }

}
