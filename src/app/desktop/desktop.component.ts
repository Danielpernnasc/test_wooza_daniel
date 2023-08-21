import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Clientes, Desktop, planoDesk } from '../model';
import { ClienteService, PlanosService, PlataformaService } from '../services';
import { EstadoService } from '../services';


@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit {
  public caracterEspecialFONE: Array<string | RegExp> = [];
  public caracterEspecialCEP: Array<string | RegExp> = [];
  public caracterEspecialCPF: Array<string | RegExp> = [];

  public EstadoList: Array<string> = [];
  PLANO = [
   "CI00001NA_NOVA_LINHA 1GB",
   "CI00002NA_NOVA_LINHA 2GB",
   "CI00003NA_NOVA_LINHA 3GB",  
    
  ];
  
  desktop = {} as Desktop;
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
    private listadosEstado: EstadoService,
    private caracterSpecial: EstadoService) { }

  ngOnInit(): void {
    this.getPlataformaDesktop();
    this.getPlano();
    this.getClient();
    this.EstadoList = this.listadosEstado.listasEstado();
    this.caracterEspeciais();
  }

 
  public caracterEspeciais(){
    this.caracterEspecialFONE = this.caracterSpecial.RegExpCarcterFone();
    this.caracterEspecialCEP = this.caracterSpecial.RegExpCarcterCEP();
    this.caracterEspecialCPF = this.caracterSpecial.RegExpCarcterCPF();
  }


  changed(value) {
    this.value = value;
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

  saveClient(form: NgForm) {
    if (this.client.id !== undefined) {
      this.clientService.updateClient(this.client).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.clientService.saveClient(this.client).subscribe(() => {
        this.cleanForm(form);
      })
    }
    
  }
  deleteClient(cliente: Clientes) {
    this.clientService.deleteClient(cliente).subscribe(() => {
      this.getClient();
    });
  }

  editClient(cliente: Clientes) {
    this.client = {...cliente};
  }

  cleanForm(form: NgForm) {
    this.getClient();
    form.resetForm();
    this.client = {} as Clientes;
  }


  Franquia = "Contrate a Franquia de 5GB para acessar internet";
  mensagemcliente = "Preencha os dados abaixo e instalaremos sua internet em até 3 dias uteis";
}
