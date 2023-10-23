import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateProductComponent } from './feature/create-product/create-product.component';
import { IconComponent } from './ui/icon/icon.component';
import { UploadZoneComponent } from './ui/upload-zone/upload-zone.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, CreateProductComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    IconComponent,
    ReactiveFormsModule,
    UploadZoneComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
