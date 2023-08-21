import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Clientes, Modem, Wifi } from '../model';
import { ClienteService, PlanosService, PlataformaService } from '../services';
import { EstadoService } from '../services/estado.service';

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.component.html',
  styleUrls: ['./wifi.component.scss']
})
export class WifiComponent implements OnInit {
  public caracterEspecialFONE: Array<string | RegExp> = [];
  public caracterEspecialCEP: Array<string | RegExp> = [];
  public caracterEspecialCPF: Array<string | RegExp> = [];

  wifi = {} as Wifi;
  roteador: Wifi[];

  modem = {} as Modem;
  sinal: Modem[]
  public EstadoList: Array<string> = [];
  PLANO = [
   "WI00001NA_NOVA_LINHA 1GB",
   "WI00002NA_NOVA_LINHA 2GB"  
  ];

  client = {} as Clientes;
  clients: Clientes[];

  value: any;


  constructor(
    private plataformaService: 
    PlataformaService, 
    private planoService: PlanosService, 
    private clientService: ClienteService,
    private listadosEstado: EstadoService,
    private caracterSpecial: EstadoService
    ) { }
  changed(value) {
    this.value = value;
  }



  ngOnInit(): void {
    this.getPlataformatWifi();
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

  getPlataformatWifi(){
    this.plataformaService.getPlataformaWifi().subscribe((roteador: Wifi[]) => {
      this.roteador = roteador
    })
  }

  getPlano(){
    this.planoService.getPlanoWifi().subscribe((sinal: Modem[]) => {
      this.sinal = sinal
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
  // deleteClient(cliente: Clientes) {
  //   this.clientService.deleteClient(cliente).subscribe(() => {
  //     this.getClient();
  //   });
  // }

  // editClient(cliente: Clientes) {
  //   this.client = {...cliente};
  // }

  cleanForm(form: NgForm) {
    this.getClient();
    form.resetForm();
    this.client = {} as Clientes;
  }

  Franquia = "Contrate a Franquia de 5GB para acessar internet";
  mensagemcliente = "Preencha os dados abaixo e instalaremos sua internet em até 3 dias uteis";
}
