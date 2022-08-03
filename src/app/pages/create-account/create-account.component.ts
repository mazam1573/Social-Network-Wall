import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  createAccountForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.maxLength(10)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, public userService: UserService, public snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }
  create() {
    this.userService.createNewUser(this.createAccountForm.value).then((res) => {
      console.log(res);
      this.userService.user = res;
      localStorage.setItem('user', JSON.stringify(res));
      this.router.navigate(['/posts'])
    }).catch((err) => {
      console.log(err);
    })
  }

}