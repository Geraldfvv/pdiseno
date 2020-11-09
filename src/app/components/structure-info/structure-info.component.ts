import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { StructureService } from 'src/app/services/structure.service';

@Component({
  selector: 'app-structure-info',
  templateUrl: './structure-info.component.html',
  styleUrls: ['./structure-info.component.css']
})
export class StructureInfoComponent implements OnInit {

  constructor(
    private structService: StructureService,
    private router: Router,
    private memberService: MemberService) { }

  ngOnInit() {
    this.structService.getFlow()
    this.structService.getStructureMembers();
    this.structService.getStructureBosses();
    this.structService.getType();
  }

  addMemberAux() {
    this.memberService.getMembers()
  }

  addMember(member) {
    this.structService.addMember(member.id);
  }

  addBoss(member) {
    this.structService.addBoss(member.id);
  }

  deleteMember(member){
    console.log(member.id,this.structService.structureFlow.slice(-1).pop())
    this.structService.deleteMember(member.id,this.structService.structureFlow.slice(-1).pop()._id);
  }

  breadcrumb(type){
    if (type == 0){
      this.structService.setID("5fa66f4cdacd730fe98abe74");
      this.structService.getLevel("5fa66f4cdacd730fe98abe74");
      this.structService.setType("zone");
      this.structService.structureFlow = [];
      this.structService.setFlow();
      this.router.navigate(['/manager'])
    } else if (type == 1) {
      this.structService.setID(this.structService.structureFlow[0]._id);
      this.structService.getLevel(this.structService.structureFlow[0]._id);
      this.structService.setType("branch");
      this.structService.structureFlow = this.structService.structureFlow.slice(0, 1);
      this.structService.setFlow();
      this.router.navigate(['/manager'])
    } else if (type == 2) {
      this.structService.setID(this.structService.structureFlow[1]._id);
      this.structService.getLevel(this.structService.structureFlow[1]._id);
      this.structService.setType("group");
      this.structService.structureFlow = this.structService.structureFlow.slice(0, 2);
      this.structService.setFlow();
      this.router.navigate(['/manager'])
    }
  }

}
