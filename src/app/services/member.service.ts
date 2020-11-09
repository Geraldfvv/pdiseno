import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  uriOrganization = environment.uri + "/auth";
  uriMember = environment.uri + "/member";
  organizationId: String = '';
  memberList: any;
  member: any;
  groupsOfMember: any;

  //Form estructura
  formSignIn: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  //Form organizacion
  formOrganization: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    legalCertificate: new FormControl('', Validators.required),
    web: new FormControl('', Validators.required),
    direction: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    logoName: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  //Form miembro
  formMiembro: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    direction: new FormControl('', Validators.required)
  });


  // Hace signIn
  signIn() {
    var obj = {
      email: this.formSignIn.controls['email'].value,
      password: this.formSignIn.controls['password'].value
    }
    return this.http.post(this.uriOrganization + '/signin', obj)
  }

  // Registra una nueva organizacion
  signUp() {
    var obj = {
      name: this.formOrganization.controls['name'].value,
      legalCertificate: this.formOrganization.controls['legalCertificate'].value,
      web: this.formOrganization.controls['web'].value,
      direction: this.formOrganization.controls['direction'].value,
      phone: this.formOrganization.controls['phone'].value,
      logoName: this.formOrganization.controls['logoName'].value,
      country: this.formOrganization.controls['country'].value,
      email: this.formOrganization.controls['email'].value,
      password: this.formOrganization.controls['password'].value
    }
    this.http.post(this.uriOrganization + '/signup', obj)
  }

  // Consigue la info de un miembro en especifico
  getMemberInfo(id: String) {
    const obj = {
      id: id
    }
    this.http.post(this.uriMember + '/getMember', obj).subscribe(response => {
      this.member = response;
    })
  }

  structuresXMember(id: String) {
    const obj = {
      idUser: id
    }
    this.http.post(this.uriMember + '/getStructuresXMember', obj).subscribe(response => {
      this.groupsOfMember = response;
    })
  }

  // Edita la info de un miembro
  editMember(id: String) {
    var obj = {
      _id: id,
      name: this.formOrganization.controls['name'].value,
      legalCertificate: this.formOrganization.controls['legalCertificade'].value,
      web: this.formOrganization.controls['web'].value,
      direction: this.formOrganization.controls['direction'].value,
      phone: this.formOrganization.controls['phone'].value,
      logoName: this.formOrganization.controls['logoName'].value,
      country: this.formOrganization.controls['country'].value,
      email: this.formOrganization.controls['email'].value,
      password: this.formOrganization.controls['password'].value
    }
    this.http.post(this.uriMember + '/update', obj)
  }

  // Borra a un miembro
  deleteMember(id: String) {
    const obj = {
      id: id
    }
    this.http.post(this.uriMember + '/delete', obj)
  }

  //Cambia a un miembro de un grupo
  changeGroup(idUser: String, idOldGroup: String, idsNewStructure: String[]) {
    const obj = {
      idUser: idUser,
      idOldGroup: idOldGroup,
      ids: idsNewStructure
    }
    this.http.post(this.uriMember + '/changeGroup', obj)
  }

  // Registra a un nuevo miembro
  createMember() {
    var obj = {
      name: this.formOrganization.controls['name'].value,
      legalCertificate: this.formOrganization.controls['legalCertificade'].value,
      web: this.formOrganization.controls['web'].value,
      direction: this.formOrganization.controls['direction'].value,
      phone: this.formOrganization.controls['phone'].value,
      logoName: this.formOrganization.controls['logoName'].value,
      country: this.formOrganization.controls['country'].value,
      email: this.formOrganization.controls['email'].value,
      password: this.formOrganization.controls['password'].value
    }
    this.http.post(this.uriMember + '/create', obj);
  }

  // Consigue a todos los miembros
  getMembers() {
    this.http.get(this.uriMember + '/getMembers').subscribe(response => {
      this.memberList = response;
    });
  }

  getMonitors() {
    this.http.get(this.uriMember + '/getMonitors').subscribe(response => {
      this.memberList = response;
    });
  }





}
