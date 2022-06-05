import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  hide = true;
  username = '';
  password: string = '123';

  constructor() {}

  ngOnInit(): void {}

  login() {
    console.log('username :', this.username, 'password:', this.password);
  }
}
