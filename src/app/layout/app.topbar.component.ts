import { ProductService } from 'src/app/demo/service/product.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../auth.service';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { Subject, takeUntil } from 'rxjs';
import { EventMessage } from '@azure/msal-browser';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    
    private readonly _destroying$ = new Subject<void>();
    constructor(public pro:ProductService,private authService: AuthService,public layoutService: LayoutService,private msalService: MsalService,private msalBroadcastService: MsalBroadcastService,) { }




    ngOnInit(): void {
        if (this.msalService.instance.getAllAccounts().length != 0) {
            console.log("not 0 ",  this.msalService.instance.getActiveAccount());
          
            
            this.authService.getToken().then((res)=>{
                console.log("res",res);
                
            })
          }

        

        console.log('this.authService.instance.getAllAccounts()', this.msalService.instance.getAllAccounts());

        this.msalBroadcastService.msalSubject$
      .pipe(
        // filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
        takeUntil(this._destroying$)
      )
      .subscribe((result: EventMessage) => {
        console.log('result', result);
        console.log('result event type', result.eventType);

        // do something with the result, such as accessing ID token
      });
        
    }


    signout(){

        this.authService.logout();

    }
    getforcast(){

        console.log("calling");
        
        this.authService.getForcast().subscribe(res=>{
            console.log("res",res);
            
        });
    }


    login() {

   this.authService.login();
    
     

        // if(this.authService.isAuthenticated())
        // {
        //     this.authService.getforcast().subscribe(res=>{
        //         res=>{
        //             console.log("res",res);
                    
        //         }
        //     })
        // }
        // else
        // {
        //     this.authService.login();

        // }

       

      }

}
