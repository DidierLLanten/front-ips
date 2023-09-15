import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { SpeedDialModule } from 'primeng/speeddial';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [       
    MenubarModule,
    AvatarModule,    
    SpeedDialModule,     
  ],
})
export class PrimeNGModule {}
