import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.css']
})
export class MemberInfoComponent implements OnInit {

  constructor(private router: Router, private memberService: MemberService) { }

  ngOnInit() {
  }

}
