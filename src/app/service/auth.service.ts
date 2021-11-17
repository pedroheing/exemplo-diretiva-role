import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export enum Roles {
  Adm = 'ADM',
  Funcionario = 'FUNCIONARIO',
  Gerente = 'GERENTE'
}

export interface Usuario {
  roles: Roles[]
}

type _Usuario = Usuario | null;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _$usuario: BehaviorSubject<_Usuario>;

  constructor() {
    this._$usuario = new BehaviorSubject<_Usuario>(null);
  }

  get $usuario(): Observable<_Usuario> {
    return this._$usuario;
  }

  get usuario(): Usuario | null {
    return this._$usuario.value;
  }

  public setUsuario(u: Usuario) {
    this._$usuario.next(u);
  }


}
