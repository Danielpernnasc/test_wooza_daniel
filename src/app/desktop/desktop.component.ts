import { Component, OnInit } from '@angular/core';

import { Clientes, Desktop, planoDesk } from '../model';
import { Produtos } from '../produtos';
import { ClienteService, PlanosService, PlataformaService } from '../services';

import {Text} from '../text';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit {

  public listDesktop: Produtos;
  public EstadoList: Array<string> = [];

  public Franquia: string  = Text.aFranquia;
  public mensagemcliente: string  = Text.mensagemcliente;
  public choicePlan: string = Text.choicePlan;
  public chosenPlan: string = Text.chosenPlan


  pc: Desktop[];

  plano = {} as planoDesk;
  planos: planoDesk[];

  client = {} as Clientes;
  clients: Clientes[];

  value: any;

  constructor(
    private plataformaService: PlataformaService, 
    private planosService: PlanosService, 
    private clientService: ClienteService, 
 ) {
     
     }


  ngOnInit(): void {
    this.getPlataformaDesktop();
    this.getPlano();
    this.getClient();
 
  }

 
  public caracterEspeciais(){
    // this.caracterEspecialFONE = this.caracterSpecial.RegExpCarcterFone();
    // this.caracterEspecialCEP = this.caracterSpecial.RegExpCarcterCEP();
    // this.caracterEspecialCPF = this.caracterSpecial.RegExpCarcterCPF();
  }



  getPlataformaDesktop() {
    this.plataformaService.getPlataformaDesk().subscribe((pc: Desktop[]) => {
      this.pc = pc
    })
  }

  getPlano() {
    this.planosService.getPlanosdesk().subscribe((planos: planoDesk[]) => {
      this.planos = planos
    })
  }

  
  getClient() {
    this.clientService.getClient().subscribe((client: Clientes[]) => {
      this.clients= client
    })
  }





  
}
