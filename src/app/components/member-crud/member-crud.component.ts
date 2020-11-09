import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-crud',
  templateUrl: './member-crud.component.html',
  styleUrls: ['./member-crud.component.css']
})
export class MemberCrudComponent implements OnInit {

  constructor(private memberService: MemberService, private router: Router) { }

  selected;

  ngOnInit() {
  }

}
