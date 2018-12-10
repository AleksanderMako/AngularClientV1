import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../session-service';
import { LoginDTO } from '../DTOs/login-dto';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private fb: FormBuilder, private client: HttpClient, private session: SessionService, private router: Router,
    ) { }
    loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    ngOnInit() {
    }
    onSubmit() {
        const isFormValid = this.loginForm.valid;
        const formdata = this.loginForm.value;
        const loginPayload = {
            functionName: 'readOne',
            args: formdata
        };

        const loginUrl = 'http://localhost:4000/api/login/authenticate/user';
        if (!isFormValid) {
            alert('please enter valid data ');
        } else {
            return this.client.post(loginUrl, loginPayload, { responseType: 'json' })
                .subscribe((data: LoginDTO) => {
                    if (' Logged IN ! ') {
                        alert(JSON.stringify(data));
                        this.session.setSession('currentuser', data.token);
                        this.session.setSession('currentTypeOfUser', data.typeOfUser);
                        this.session.setSession('currentUsername', data.username);
                        if (data.typeOfUser === 'simple') {

                            this.router.navigate(['/flights']);
                        }
                    } else {
                        alert('FAILED to LOGIN WITH ERROR : ' + data.error.toString());
                    }


                    // alert(`{token is : ${this.session.getSession('currentuser')}}`);
                    // alert(`type of user is : ${this.session.getSession('currentTypeOfUser')}`);
                    // alert(`current username is : ${this.session.getSession('currentUsername')}`);

                    // alert(data.token === this.session.getSession('currentuser'));

                });
        }
    }


}
