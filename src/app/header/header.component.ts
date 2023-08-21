import { Component, OnInit } from '@angular/core';
import { Logo } from '../logo';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  public logoProjeto = Logo.logo;

  ngOnInit(): void {
  }

}
