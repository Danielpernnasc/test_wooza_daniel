import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { DesktopComponent } from './desktop';
import { HomeComponent } from './home';
import { TabletComponent } from './tablet';
import { WifiComponent } from './wifi';


const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {path: 'home', component: HomeComponent},
  {path: 'mobile', component: TabletComponent},
  {path: 'desktop', component: DesktopComponent},
  {path: 'wifi', component: WifiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
