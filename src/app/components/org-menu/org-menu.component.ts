import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StructureService } from 'src/app/services/structure.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-org-menu',
  templateUrl: './org-menu.component.html',
  styleUrls: ['./org-menu.component.css']
})
export class OrgMenuComponent implements OnInit {

  constructor(
    private router: Router,
    private structService: StructureService,
  ) { }

  ngOnInit() {
    this.structService.structureFlow = [];
    this.structService.setFlow();
    this.structService.getOrg();
  }

  goZones() {
    this.structService.setID(this.structService.org[0]);
    this.onStructure('zone');
  }

  onStructure(type: String) {
    this.structService.setType(type);
    this.router.navigate(['/manager'])
  }

}
