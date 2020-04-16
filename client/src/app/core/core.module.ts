import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomNavBarComponent } from './custom-nav-bar/custom-nav-bar.component';



@NgModule({
  declarations: [CustomNavBarComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CustomNavBarComponent
  ]
})
export class CoreModule { }
