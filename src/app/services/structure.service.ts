import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class StructureService {

  constructor(private http: HttpClient) { }

  uri = environment.uri + "/structure";
  type: String;
  structureId: any;
  structureList: any;
  structureFlow: any = [];
  memberList: any = [];
  bossList: any = [];
  msg: any = "";
  org: any = [];

  //Form estructura
  formStructure: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  //Form estructura
  formMonitor: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required)
  });

  //Asigna un valor al controlador del formulario
  populateForm(structure) {
    this.formStructure.setValue(name);
  }

  //Guarda un id en el localstorage y en el servicio
  setID(id) {
    this.structureId = id;
    localStorage.setItem('id', id);
  }

  //Obtiene un id del localstorage
  getID() {
    return localStorage.getItem('id');
  }

  //Guarda un id en el localstorage y en el servicio
  setType(type) {
    this.type = type;
    localStorage.setItem('type', type);
  }

  //Obtiene un id del localstorage
  getType() {
    return localStorage.getItem('type');
  }

  //Guarda un flow en el localstorage y en el servicio
  setFlow() {
    localStorage.setItem('flow', JSON.stringify(this.structureFlow));
  }

  //Obtiene un flow del localstorage
  getFlow() {
    this.structureFlow = JSON.parse(localStorage.getItem("flow"));
  }

  //Guarda un flow en el localstorage y en el servicio
  setOrg(org) {
    localStorage.setItem('org', JSON.stringify(org));
  }

  //Obtiene un flow del localstorage
  getOrg() {
    this.org = JSON.parse(localStorage.getItem("org"));
  }

  //Obtiene las subestructuras de una estructura
  getLevel(id: String) {
    var obj = {
      parent: id
    }
    this.http.post(this.uri + '/getLevel', obj).subscribe(
      response => {
        this.setID(id);
        this.structureList = response;
      }
    );
  }

  //Añade una estructura, para esto requiere un nombre y el id de la estructura padre
  addStructure() {
    if (this.type == "group"){
      this.createGroup();
    }else{
      const obj = {
        name: this.formStructure.controls['name'].value,
        idParent: this.structureId
      }
      this.http.post(this.uri + '/create', obj).subscribe(response => {
        if (response['message'] == undefined) {
          this.getLevel(this.structureId)
          this.msg = ""
          this.formStructure.controls['name'].setValue("");
        } else {
          this.msg = "Ya existe una estructura con este nombre."
        }
      });
    }
  }

  //Edita una estructura
  editStructure(structure) {
    var data = structure;
    data.name = this.formStructure.controls['name'].value;
    var obj = {
      id: structure._id,
      data: data
    }
    console.log(obj)
    this.http.put(this.uri + '/update', obj).subscribe(res => { this.getLevel(this.structureId) });
  }

  //Elimina una estructura
  deleteStructure(id) {
    const obj = {
      id: id
    }
    this.http.post(this.uri + '/delete', obj).subscribe(res => { this.getLevel(this.structureId) });
  }

  getIds() {
    var ids = [];
    this.structureFlow.forEach(element => {
      ids.push(element._id);
    });
    return ids;
  }

  getStructureMembers() {
    var ids = this.getIds();
    console.log(ids);
    var obj = {
      ids: ids
    }
    this.http.post(this.uri + '/getStructureMembers', obj).subscribe(
      response => {
        this.memberList = response;
      }
    );
  }

  getStructureBosses() {
    var ids = this.getIds();
    console.log(ids);
    var obj = {
      ids: ids
    }
    this.http.post(this.uri + '/getStructureBosses', obj).subscribe(
      response => {
        this.bossList = response;
      }
    );
  }

  addMember(idMember) {
    var ids = this.getIds();
    var obj = {
      ids: ids,
      idMember: idMember
    }
    console.log(obj)
    this.http.post(this.uri + '/addMemberToGroup', obj).subscribe(
      response => {
        this.getStructureMembers();
      }
    );
  }

  addBoss(idMember) {
    var ids = this.getIds();
    var obj = {
      ids: ids,
      idBoss: idMember
    }
    console.log(obj)
    this.http.post(this.uri + '/addBossToGroup', obj).subscribe(
      response => {
        this.getStructureBosses();
      }
    );
  }

  deleteMember(idMember,idGroup){
    var obj = {
      idMember: idMember,
      idGroup: idGroup
    }
    console.log(obj)
    this.http.post(this.uri+'/removeMemberFromStructure',obj).subscribe(
      response => {
        this.getStructureMembers();
      }
    );
  }

  deleteBoss(idMember,idGroup){
    var obj = {
      idMember: idMember,
      idGroup: idGroup
    }
    console.log(obj)
    this.http.post(this.uri+'/removeMemberFromStructure',obj).subscribe(
      response => {
        this.getStructureMembers();
      }
    );
  }

  createGroup() {
    const obj = {
      name: this.formStructure.controls['name'].value,
      idParent: this.structureId
    }
    this.http.post(this.uri + '/create', obj).subscribe(response => {
      if (response['message'] == undefined) {
        this.getLevel(this.structureId)
        this.msg = ""
        this.formStructure.controls['name'].setValue("");
        this.formMonitor.controls['name'].setValue("");
        var flow =  [] 
        this.structureFlow.push(response);
        this.addBoss(this.formMonitor.controls['id'].value)
      } else {
        this.msg = "Ya existe una estructura con este nombre."
      }
    });
  }


 

  
}
