import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private memberService: MemberService) { }

  ngOnInit() {
  }

  signUp() {
    this.memberService.signUp();
    this.router.navigate(['/']);
  }

}
