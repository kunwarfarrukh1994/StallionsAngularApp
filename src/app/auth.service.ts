import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, InteractionType, PopupRequest, PublicClientApplication, RedirectRequest, BrowserCacheLocation, LogLevel } from '@azure/msal-browser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export const b2cPolicies = {
  names: {
    signUpSignIn: "B2C_1_susi",
  },
  authorities: {
    signUpSignIn: {
      authority: "https://stallionsdomian.b2clogin.com/stallionsdomian.onmicrosoft.com/B2C_1_susi"
    },
  },
  authorityDomain: "stallionsdomian.b2clogin.com"
};


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private pca: PublicClientApplication;

  constructor(public http: HttpClient,
  ) {

    this.initializeMsal().then(() => {
      this.pca.initialize();
    });
  }

  private async initializeMsal() {
    const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

    this.pca = await new PublicClientApplication({
      auth: {
        clientId: environment.clientId,
        authority: b2cPolicies.authorities.signUpSignIn.authority,
        knownAuthorities: [b2cPolicies.authorityDomain],
        redirectUri: environment.redirectUri,
      },
      cache: {
        cacheLocation: 'localStorage',
      }
    });

    try {
      await this.pca.initialize()
      await this.pca.handleRedirectPromise(); // Handle redirect if there's any
    } catch (error) {
      console.error('Error during MSAL initialization:', error);
    }
  }


  login() {
    // return this.pca.loginPopup();
    return this.pca.loginRedirect();
  }



  //   login(userFlowRequest?: RedirectRequest | PopupRequest) {
  //     if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
  //         if (this.msalGuardConfig.authRequest) {
  //             this.authService.loginPopup({ ...this.msalGuardConfig.authRequest, ...userFlowRequest } as PopupRequest)
  //                 .subscribe((response: AuthenticationResult) => {
  //                     this.authService.instance.setActiveAccount(response.account);
  //                 });
  //         } else {
  //             this.authService.loginPopup(userFlowRequest)
  //                 .subscribe((response: AuthenticationResult) => {
  //                     this.authService.instance.setActiveAccount(response.account);
  //                 });
  //         }
  //     } else {
  //         if (this.msalGuardConfig.authRequest) {
  //             this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest, ...userFlowRequest } as RedirectRequest);
  //         } else {
  //             this.authService.loginRedirect(userFlowRequest);
  //         }
  //     }
  // }
  // login(userFlowRequest?: RedirectRequest | PopupRequest) {
  //   if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
  //     if (this.msalGuardConfig.authRequest) {
  //       this.authService.loginPopup({ ...this.msalGuardConfig.authRequest, ...userFlowRequest } as PopupRequest)
  //         .subscribe((response: AuthenticationResult) => {
  //           this.authService.instance.setActiveAccount(response.account);
  //         });
  //     } else {
  //       this.authService.loginPopup(userFlowRequest)
  //         .subscribe((response: AuthenticationResult) => {
  //           this.authService.instance.setActiveAccount(response.account);
  //         });
  //     }
  //   } else {
  //     debugger;
  //     if (this.msalGuardConfig.authRequest) {
  //       this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest, ...userFlowRequest } as RedirectRequest);
  //     } else {
  //       this.authService.loginRedirect(userFlowRequest);
  //     }
  //   }
  // }

  logout() {
    return this.pca.logoutRedirect();
  }

  getToken() {
    return this.pca.acquireTokenSilent({ scopes: ['Users.Create', 'Users.Read'] });
  }

  handleRedirect() {
    return this.pca.handleRedirectPromise();
  }

  isAuthenticated(): boolean {
    const account = this.pca.getAllAccounts()[0];
    return !!account;
  }
  addUser(user: any) {
    return this.http.post(`${environment.baseUri}/Users/AddUser`, user);
  }
  getusers() {
    return this.http.get<any[]>(`${environment.baseUri}/Users/GetUsers`)
  }

  getForcast() {
    // const token="eyJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3N0YWxsaW9uc2RvbWlhbi5iMmNsb2dpbi5jb20vZWI4Y2Y5ZjctOWNiNi00MTEyLTliYTYtYWI4YWRmZWMxZTA0L3YyLjAvIiwic3ViIjoiNWZiNzM2NWUtZWI4NS00YzllLWFmNzgtOTdjMzhhNDRjZDMwIiwiYXVkIjoiNDI4YjRlYWUtMmZkMC00MjBmLTkwOWUtYjllYzdhMDdhYWI0IiwiZXhwIjoxNzA4ODkxMDYyLCJub25jZSI6IjAxOGRlMWExLTM4YTUtN2Y4Ny1hZjdkLTQ0ZTVhNDk1MzVhMSIsImlhdCI6MTcwODg4NzQ2MiwiYXV0aF90aW1lIjoxNzA4ODg3NDU4LCJuYW1lIjoiRmFycnVraCBLaGFuIiwidGZwIjoiQjJDXzFfc3VzaSIsIm5iZiI6MTcwODg4NzQ2Mn0.LaiLZirhmNN2Xjwpm0_WZN0q4AAMvQ7aaYCMxAzegWrEL70Nmpm1OftYF_odlvkgdPkMj8vGTXHI908ApsnWp0jUhPY2SeZCQdeqz071FnNKVLu_uWIfnSTKVnYzXZqin1AANzTQqgL8X7yaANehll-My4kIy1ZWm52qX0uAcBvPxRHm4-GPI7_Lek5NuIbVPAsNSa6_K_VOoF6NyDIqHaW2C0f7nYuf88WZNjVmtwrE270nuqnQZKZAVWLGBMWV8z55sC_5hmEN2LeYVA27AmWdNG1XyDW1jNJnpkdGryEoh2eC98yWupANIwDzTqCrkoiBqUF-kvnvGp_4jFwDAw"

    let token = localStorage.getItem("access_token");
    return this.http.get<any>(`${environment.baseUri}/WeatherForecast`, { headers: new HttpHeaders().append('Authorization', `Bearer ${token}`) });
  }
}
