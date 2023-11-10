import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user/user.service";
import {TokenService} from "../../../service/security/token.service";
import {FormBuilder} from "@angular/forms";
import {User} from "../../../model/user/user";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  // @ts-ignore
  id: number;

  // @ts-ignore
  detailUser: User;

  constructor(private userService: UserService,
              private tokenService: TokenService,
              private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.paramMap.subscribe(data => {
      const id = data.get('id');
      if (id != null) {
        this.detailByIdUser(+id);
      }
    });

  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  detailByIdUser(id: number) {
    this.userService.detailUser(id).subscribe(
      data => {
        this.detailUser = data;
      }
    );
  }
}
