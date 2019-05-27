import { ChangeDetectorRef,Input , Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MainPageMenuItems } from '../../../shared/MainPageMenuItems/MainPageMenuItems';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class AppHeaderComponent {

  mobileQuery: MediaQueryList;
  
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public menuItems: MainPageMenuItems) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    
  }

  ngOnInit(){


  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
