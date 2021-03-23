import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'user-form';

  form: FormGroup;
  users: Observable<User[]>;
  toUpdate: number;

  constructor(private formBuilder: FormBuilder,
              private userService: UsersService) {
      this.form = this.buildForm();
      this.users = userService.getAll();
      this.toUpdate = null;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      gender: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  createUser(): void {
    let user: User = this.form.value;
    user.lastName = this.form.value.lastName.toUpperCase();
    
    this.userService.create(user)
                    .subscribe(users => this.users = this.userService.getAll());
    this.form.reset();
  }

  deleteUser(id: number): void {
    this.userService.delete(id)
                    .subscribe(users => this.users = this.userService.getAll());
    this.toUpdate = null;
    this.form.reset();
  }

  getUser(id: number): void {
    this.userService.get(id)
                    .subscribe(user => { 
                      this.toUpdate = user.id;
                      this.form.setValue({
                        "firstName": user.firstName,
                        "lastName":  user.lastName,
                        "gender": user.gender
                      });
                    });
  }

  editUser(): void {
    this.userService.patch(this.toUpdate, this.form.value)
                    .subscribe(user => this.users = this.userService.getAll());
    this.toUpdate = null;   
    this.form.reset();
  }
}
