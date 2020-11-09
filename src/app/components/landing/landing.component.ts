import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, finalize } from 'rxjs/operators'
import { MemberService } from 'src/app/services/member.service';
import { StructureService } from 'src/app/services/structure.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private router: Router, private memberService: MemberService, private structureService: StructureService) { }

  mensaje: any = "";

  ngOnInit() {
  }

  signIn() {
    this.memberService.signIn().subscribe(response => {
      console.log(response)
      if (response[0] != undefined) {
        this.structureService.org = response;
        this.structureService.setOrg(response);
        this.router.navigate(['/home']);
      }
    },
      error => this.mensaje = "Los datos no existen")
  }

  signUp() {
    this.router.navigate(['/register']);
  }

}
