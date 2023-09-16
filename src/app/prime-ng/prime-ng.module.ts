import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { SpeedDialModule } from 'primeng/speeddial';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    MenubarModule,
    AvatarModule,
    SpeedDialModule,
    TableModule,
    ToolbarModule,
    ToastModule,
    DialogModule,
    ConfirmDialogModule,
    FileUploadModule,
    RatingModule,
    TagModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    InputTextModule,
  ],
})
export class PrimeNGModule {}
