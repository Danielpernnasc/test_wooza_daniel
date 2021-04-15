import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Clientes, Modem, Wifi } from '../model';
import { ClienteService, PlanosService, PlataformaService } from '../services';

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.component.html',
  styleUrls: ['./wifi.component.scss']
})
export class WifiComponent implements OnInit {
  public maskfone = ['(',/[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/,/\d/,/\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskcep = [/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/];
  public maskcpf = [/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/,];

  wifi = {} as Wifi;
  roteador: Wifi[];

  modem = {} as Modem;
  sinal: Modem[]
  UF = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
  PLANO = [
   "WI00001NA_NOVA_LINHA 1GB",
   "WI00002NA_NOVA_LINHA 2GB"  
  ];

  client = {} as Clientes;
  clients: Clientes[];

  value: any;

  constructor(private plataformaService: PlataformaService, private planoService: PlanosService, private clientService: ClienteService) { }
  changed(value) {
    this.value = value;
  }
  changeState(e) {
    this.value = e;
  }

  ngOnInit(): void {
    this.getPlataformatWifi();
    this.getPlano();
    this.getClient();
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
