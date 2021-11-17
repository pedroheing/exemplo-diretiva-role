import { Component, OnInit } from '@angular/core';
import { AuthService, Roles } from '../../service/auth.service'

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.scss']
})
export class InicialComponent implements OnInit {

  public enumRoles = Roles;
  private roles: Roles[];

  constructor(
    private authService: AuthService,

  ) {
    this.roles = [];
  }

  ngOnInit(): void {
  }

  changeRole(e) {
    const value = e.source.value;
    if (e.checked) {
      this.roles.push(value)
    } else {
      this.roles.splice(this.roles.indexOf(value), 1);
    }
    console.log(this.roles)
    this.authService.setUsuario({roles: this.roles})
  }

}
