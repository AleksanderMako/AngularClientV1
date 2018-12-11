import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import DataTransportService from '../services/dataTransportService';
import { UsersTableItem } from '../Models/dataTableUser';
import { StandardUserCrudDTO } from '../DTOs/user-crud-dto';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  private toEditUser: UsersTableItem;
  private updateForm: FormGroup;
  public Delete_disable: any;
  public show: any;
  constructor(private fb: FormBuilder, private client: HttpClient, private dataTransportService: DataTransportService) { }


  ngOnInit() {
    const key = 'toEditUser';
    this.toEditUser = this.dataTransportService.getItem(key, 1);
    this.show = 0;
    // alert(JSON.stringify(this.toEditUser));
    this.updateForm = this.fb.group({
      firstname: [this.toEditUser.firstname, Validators.required],
      lastName: [this.toEditUser.lastName, Validators.required],
      age: [this.toEditUser.age, Validators.compose([
        Validators.required]
      )],
    });
  }
  onSubmit() {
    const isFormValid = this.updateForm.valid;

    const updateUrl = 'http://localhost:4000/api/user/update';
    const updatePayload = {
      functionName: 'update',
      args: {
        username: this.toEditUser.username,
        firstname: this.updateForm.controls['firstname'].value,
        lastName: this.updateForm.controls['lastName'].value,
        age: this.updateForm.controls['age'].value
      }
    };
    if (!isFormValid) {
      alert('Please enter valid form data ');
    } else {
      return this.client
        .post(updateUrl, updatePayload, { responseType: 'json' })
        .subscribe((data: StandardUserCrudDTO) => {
          if (data.opStatus === 'success' && data.hasError === false) {
            alert(JSON.stringify(data.data));
          } else {
            alert(`{
              status :${data.opStatus}
              error : ${data.error}
            }`);
          }
        });
    }

  }

  update() {
    this.Delete_disable = 1;
    this.show = 1;

  }
  disabled() {
    return this.Delete_disable;
  }
  showBtn() {
    return this.show;
  }
  delete() {
    alert ('delete method got called ');
    const deleteUrl = 'http://localhost:4000/api/user/delete';
    const deletePayload = {
      functionName: 'delete',
      args: {
        username: this.toEditUser.username
      }
    };
    return this.client
      .post(deleteUrl, deletePayload, { responseType: 'json' })
      .subscribe((data: StandardUserCrudDTO) => {
        if (data.opStatus === 'success' && data.hasError === false) {
          alert(JSON.stringify(data.data));
        } else {
          alert(`{
            status :${data.opStatus}
            error : ${data.error}
          }`);
        }
      });

  }

}
