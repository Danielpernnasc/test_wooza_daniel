import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabletComponent } from './tablet';
import { DesktopComponent } from './desktop';
import { WifiComponent } from './wifi';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FormComponent } from './form/form.component';



@NgModule({
  declarations: [
    AppComponent,
    TabletComponent,
    DesktopComponent,
    WifiComponent,
    HomeComponent,
    HeaderComponent,
    FormComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
