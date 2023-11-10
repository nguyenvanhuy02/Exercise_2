import { Component, OnInit } from '@angular/core';
import {User} from "../../../model/user/user";
import {UserService} from "../../../service/user/user.service";
import {TokenService} from "../../../service/security/token.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // @ts-ignore
  profileUser: User;

  constructor(private userService: UserService,
              private tokenService: TokenService
  ) {
  }

  ngOnInit(): void {
    this.profile();
  }

  // tslint:disable-next-line:typedef
  profile() {
    this.profileUser = JSON.parse(this.tokenService.getUser());
    this.userService.detailUser(this.profileUser.id).subscribe(data => {
      this.profileUser = data;
    });
  }

}
