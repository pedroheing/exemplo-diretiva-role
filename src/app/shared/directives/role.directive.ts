import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService, Roles } from 'src/app/service/auth.service';

@Directive({
  selector: '[roles]'
})
export class RoleDirective implements OnInit {

  @Input() roles: any[];
  private isVisible: boolean;

  constructor(
    private templateRef: TemplateRef<any>,
    private userService: AuthService,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    this.userService.$usuario.subscribe(
      u => {
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
  }
}