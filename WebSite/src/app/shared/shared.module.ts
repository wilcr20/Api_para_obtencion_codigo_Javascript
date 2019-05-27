import { NgModule } from '@angular/core';

import { MenuItems } from './menu-items/menu-items';
import { MainPageMenuItems } from './MainPageMenuItems/MainPageMenuItems';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';


@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
   ],
  providers: [ MenuItems,MainPageMenuItems]
})
export class SharedModule { }
