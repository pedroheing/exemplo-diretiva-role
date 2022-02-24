import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService, Roles } from 'src/app/service/auth.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[roles]'
})
export class RoleDirective implements OnInit {

  @Input() roles: any[];
  private isVisible: boolean;
  private subs: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private userService: AuthService,
    private viewContainer: ViewContainerRef
  ) {
    this.subs = new Subscription();
  }

  ngOnInit() {
    const sub = this.userService.$usuario.subscribe(
      u => {
        // se adm pode tudo, ao invés de colocar 'ADM' em todos as tags só adicione essa verificação na diretiva
        /*if (u && u.roles.includes(Roles.Adm)){
          if (!this.isVisible) {
            this.isVisible = true;
            this.viewContainer.createEmbeddedView(this.templateRef);
          }
          return;
        }*/
        if (u && this.roles.some(r => u.roles.includes(r))) {
          if (!this.isVisible) {
            this.isVisible = true;
            this.viewContainer.createEmbeddedView(this.templateRef);
          }
        } else {
          this.isVisible = false;
          this.viewContainer.clear();
        }
      } 
    );
    this.subs.add(sub);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  
}