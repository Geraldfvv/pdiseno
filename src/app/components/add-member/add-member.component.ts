import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  constructor(private router: Router, private memberService: MemberService) { }

  ngOnInit() {
  }

  createMember() {
    this.memberService.createMember();
  }

}
