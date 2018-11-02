import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './_services/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AVLAdminClient';
  public values: string[];
  logout = false;
  currentUser: string;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    //this.http.get('/api/values').subscribe(result => {
    //  this.values = result as string[];
    //}, error => console.error(error));

    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      this.logout = true;
      var localUser = JSON.parse(localStorage.getItem('currentUser'));
      this.currentUser = localUser.email;
    }
  }

  logoutButton() {
    console.log("logout invoked app component");
    this.authenticationService.logout();
    location.reload();
  }

}
