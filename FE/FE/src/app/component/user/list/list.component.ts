import { Component, OnInit } from '@angular/core';
import {PageForm} from "../../../model/user/PageList";
import {UserService} from "../../../service/user/user.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  // @ts-ignore
  userList: PageForm;

  constructor(private formService: UserService) { }

  ngOnInit(): void {
    this.findAllForm(0);
  }

  // tslint:disable-next-line:typedef
  findAllForm(pageNumber: number) {
    this.formService.userList(pageNumber).subscribe(
      data => {
        this.userList = data;
      },
    );
  }

  // tslint:disable-next-line:typedef
  gotoPage(pageNumber: number) {
    this.findAllForm(pageNumber);
  }

}
