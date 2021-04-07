import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabletComponent } from './tablet';
import { DesktopComponent } from './desktop';
import { WifiComponent } from './wifi';

@NgModule({
  declarations: [
    AppComponent,
    TabletComponent,
    DesktopComponent,
    WifiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
