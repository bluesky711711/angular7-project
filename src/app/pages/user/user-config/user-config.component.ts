import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.css']
})
export class UserConfigComponent implements OnInit {

  userId;
  user;
  age = new FormControl('', Validators.required);
  occupation = new FormControl('', Validators.required);

  dataUserForm = new FormGroup({
    age: this.age,
    occupation: this.occupation,
  });

  constructor(private route: ActivatedRoute, private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    if (this.route.parent) {
      this.route.parent.params.subscribe(params => this.userId = params.id);
    }
    this.user = this.userService.getUser(this.userId);
    this.user.subscribe(user => {
      this.dataUserForm.get('age').setValue(user.age);
      this.dataUserForm.get('occupation').setValue(user.occupation);
    });
  }

  dataUser(form) {
    const data = {
      updateAt: Date(),
      age: form.age,
      occupation: form.occupation
    };
    this.userService.updateUser(this.userId, data)
      .then(() => this.toastr.success('Guardado!', 'Piensa digital'))
      .catch((e) => this.toastr.error('Error:' + e, 'Piensa digital'));
  }

  changeAge(event): void {
    this.dataUserForm.get('age').setValue(event);
  }

  changeOccupation(event): void {
    this.dataUserForm.get('occupation').setValue(event);
  }

}
