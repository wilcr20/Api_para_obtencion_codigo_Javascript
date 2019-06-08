import { ChangeDetectorRef, Component, NgZone, OnDestroy, ViewChild, HostListener, Directive, AfterViewInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent {
  mobileQuery: MediaQueryList;
  private name : string;
  
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public menuItems: MenuItems,private router: Router) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.name = localStorage.getItem('nombreUsuario')
  }

  logOut(){
    var oldThis =this;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://dynamiclibraryjdl.herokuapp.com/logout", true);
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        oldThis.router.navigate(['/']);
      }
    }

 //   xhttp.withCredentials = true;
    xhttp.send();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
 
}