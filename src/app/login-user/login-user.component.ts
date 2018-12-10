import { Component, OnInit } from '@angular/core';
import { LoginUser } from '../loginUser';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../session-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  userFrom = this.fb.group({
    username: ['', Validators.required],
    firstname: ['', Validators.required],
    lastName: ['', Validators.required],
    password: ['', Validators.required],
    age: ['', Validators.compose([
      Validators.required]
    )],
  });
  user: LoginUser;
  constructor(private fb: FormBuilder, private client: HttpClient, private reoute: Router) { }

  ngOnInit() {

  }
  onSubmit() {

    const isFormValid = this.userFrom.valid;
    const user = this.userFrom.value;
    const postPayload = {
      functionName: 'create',
      args: user
    };
    const postUrl = 'http://localhost:4000/api/user/register';
    if (!isFormValid) {
      alert('Please enter valid from data ');
    } else {
      return this.client.post(postUrl, postPayload, { responseType: 'json' }).subscribe((data) => {
        alert(JSON.stringify(data));
        this.reoute.navigate(['/login']);
      });
    }
  }

}
