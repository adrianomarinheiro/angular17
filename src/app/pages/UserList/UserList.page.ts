import { Component } from '@angular/core';
import { UsersService } from '../../services/Users.service';

@Component({
  templateUrl: './UserList.page.html',
  styleUrls: ['./UserList.page.css']
})

export class UserListPage {

  private loading = true;
  private items = [];

  constructor(
    private usersService: UsersService
  ) {}

  ngOnInit(){
    this.usersService.list()
      .subscribe(data => {
        this.items = [];
        for(let i = 0; i < data.length; i++) {
          this.items.push(data[i].payload.doc.data())
        }

        this.loading = false;
        
      });
  }

 

}
