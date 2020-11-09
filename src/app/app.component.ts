import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from './services/member.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyecto-diseno';

  constructor(private memberService: MemberService, private router: Router) { }

  signOut() {
    this.memberService.organizationId = "";
    this.router.navigate(['/']);
  }
}
