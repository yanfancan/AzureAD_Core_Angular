import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DboServiceAccount } from '../_models/dboServiceAccount';
import { DboService } from '../_models/dboService';
import { DboServiceAccountServices } from '../_models/dboServiceAccountServices';
import { fail } from 'assert';

@Component({
  selector: 'app-map-services',
  templateUrl: './map-services.component.html',
  styleUrls: ['./map-services.component.css']
})

export class MapServicesComponent implements OnInit {

  public currentUser;
  p: number = 1;
  public serviceAccounts: DboServiceAccount[];
  public associatedServices: DboService[] = new Array<DboService>();
  public unassociatedServices: DboService[] = new Array<DboService>();
  public withService: DboServiceAccount[] = new Array<DboServiceAccount>();
  public withoutService: DboServiceAccount[] = new Array<DboServiceAccount>();
  public initialServiceAccounts: DboServiceAccount[];
  public services: DboService[];
  public selectedServiceAccount: DboServiceAccount;
  public selectedService: DboService;
  public temp: DboService[];


  constructor(private http: HttpClient) {

    //get service accounts
    this.http.get('/api/users/serviceAccounts').subscribe(result => {
      this.serviceAccounts = result as DboServiceAccount[];

      //populate service accounts with currently associated services
      for (var i = 0; i < this.serviceAccounts.length; i++) {
        this.getAssosciatedServices(i);
      }

    }, error => console.error(error));

    //get all services
    this.http.get('/api/users/services').subscribe(result => {
      this.services = result as DboService[];

    }, error => console.error(error));


  }


  ngOnInit() {
    var localUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUser = localUser.email;


  }

  getAssosciatedServices(i) {
    this.http.get('/api/users/associatedServices/' + this.serviceAccounts[i].id).subscribe(result => {
      this.temp = result as DboService[];
      this.serviceAccounts[i].services = this.temp
      this.initialServiceAccounts = JSON.parse(JSON.stringify(this.serviceAccounts))
    }, error => console.error(error));
  }

  hasService(serviceAccount: DboServiceAccount, service: DboService) {
    if (serviceAccount.services.map(function (s) { return s.id }).includes(service.id)) { return "checked" }
    return ""
  }
  
  onCheck(e, sA: DboServiceAccount, s: DboService) {
    if (e.target.checked) {
      sA.services.push(s);
    } else {
      sA.services = sA.services.filter(service => service.id !== s.id); 
    }
  } 

  // fill the list boxes displaying the assosciated service accounts
  getLists() {
    this.associatedServices = [];
    this.unassociatedServices = [];
    for (var s of this.services) {
      if (this.selectedServiceAccount.services.map(function (s) { return s.id }).includes(s.id)) {
        this.associatedServices.push(s);
      }
      else {
        this.unassociatedServices.push(s);
      }
    }
  }

  select(service) {
    this.selectedService = service;
  }

  addAccount() {
    var s = this.selectedService
    if (!(this.selectedServiceAccount.services.map(function (s) { return s.id }).includes(s.id))) {
      this.selectedServiceAccount.services.push(this.selectedService);
    }
    this.getLists()
  }

  removeAccount() {
    for (var i = 0; i < this.selectedServiceAccount.services.length; i++) {
      if (this.selectedServiceAccount.services[i].id == this.selectedService.id) {
        this.selectedServiceAccount.services.splice(i, 1);
      }
    }
    this.getLists()
  }


  save() {
    console.log(this.serviceAccounts.length)
    for (var i = 0; i < this.serviceAccounts.length; i++) {
      console.log("--------initial---" + this.initialServiceAccounts[i].loginName)
      console.log(this.initialServiceAccounts[i])
      console.log("-----" + this.serviceAccounts[i].loginName)
      console.log(this.serviceAccounts[i])
    }

    var newSAS: DboServiceAccountServices[] = new Array<DboServiceAccountServices>();
    var deleteSAS: DboServiceAccountServices[] = new Array<DboServiceAccountServices>();

    for (var i = 0; i < this.serviceAccounts.length; i++) {
      for (var service of this.serviceAccounts[i].services) {
        if (!(this.initialServiceAccounts[i].services.map(function (s) { return s.id }).includes(service.id))) {
          var temp: DboServiceAccountServices = { id: 0, serviceAccountId: this.serviceAccounts[i].id, serviceId: service.id, addedBy: this.currentUser }

          newSAS.push(temp)
        }
      }
      for (var service of this.initialServiceAccounts[i].services) {
        if (!(this.serviceAccounts[i].services.map(function (s) { return s.id }).includes(service.id))) {
          var temp: DboServiceAccountServices = { id: 0, serviceAccountId: this.serviceAccounts[i].id, serviceId: service.id, addedBy: this.currentUser }

          deleteSAS.push(temp)
        }
      }
    }

    if (newSAS.length !== 0) {
      this.http.post<any>('/api/users/new-ServiceAccountService', newSAS).subscribe(result => {
      }, error => console.error(error));

    }

    // post the records to delete
    //if (this.deletedRecords != null) {
    console.log(deleteSAS)
    if (deleteSAS.length !== 0) {
      this.http.post<any>('/api/users/delete-ServiceAccountService', deleteSAS).subscribe(result => {
      }, error => console.error(error));

    }
    location.reload();
  }
}
