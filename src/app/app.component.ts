import { Component } from '@angular/core';
import { OidcFacade } from 'ng-oidc-client';
import { Observable } from 'rxjs';
import { User } from 'oidc-client';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'code-flow';
  identity$: Observable<User>;

  constructor(
    private http: HttpClient,
    private oidcFacade: OidcFacade,
  ) {
    this.identity$ = this.oidcFacade.identity$;
  }

  public ngOnInit() {
    this.oidcFacade.getOidcUser();
  }

  signoutRedirect() {
    this.oidcFacade.signoutRedirect();
  }

  loginPopup() {
    this.oidcFacade.signinPopup();
  }

  logoutPopup() {
    this.oidcFacade.signoutPopup();
  }

  checkUserInfo() {
    const identityProviderUrl = this.oidcFacade.getOidcClient().settings
      .authority;

    this.identity$ = this.http.get<User>(
      `${identityProviderUrl}/connect/userinfo`
    );
  }
}
