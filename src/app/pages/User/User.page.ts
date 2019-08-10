import { Component } from '@angular/core';

import { UsersService } from '../../services/Users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './User.page.html',
  styleUrls: ['./User.page.css']
})
export class UserPage {
  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    age: new FormControl(''),
    phone: new FormControl('', Validators.required),
  });

  userId: string = '';
  private docId: string = '';
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit(){
    this.userId = this.route.snapshot.paramMap.get('id');
    if(this.userId) this.getUser(this.userId);
  }

  private getUser(id: string) {    
    console.log(id);
    this.usersService.getById(id).subscribe((data: any) => {
      const { doc } = data[0].payload;

      this.docId = doc.id;
      const result = doc.data();

      Object.keys(result)
        .filter(item => item !== 'id')
        .forEach(item => {          
          this.userForm.controls[item].setValue(result[item]);
        
          this.loading = false;
        });
        
    });
  }

  
  

  onSubmit() {
    this.loading = true;

    if (this.userId){
      this.usersService.update(this.docId, { ...this.userForm.value, id: this.userId })
      .then(() => this.loading = false)
      .catch((err) => this.loading = false);
    } else {
      this.usersService.create(this.userForm.value)
      .then(() => this.loading = false)
      .catch((err) => this.loading = false);
    }
  }
}
