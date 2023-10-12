import { Component } from '@angular/core';
import { LocalstorageService } from './services/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jwt-auth-ang';

  constructor(private localServ: LocalstorageService) {}

  onLogOut(){
    this.localServ.remove('token');
  }
}
