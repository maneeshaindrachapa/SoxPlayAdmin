import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdminUserApi} from '../../../services/sdk/services/custom';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user = {username: '', pass: ''};

  constructor(private router: Router, private userAPI: AdminUserApi) {
  }

  ngOnInit() {
  }

  dashboard_route() {
    this.userAPI.login({username: this.user.username, password: this.user.pass}).subscribe(data => {
      this.router.navigate(['dashboard']);
    });
  }
}
