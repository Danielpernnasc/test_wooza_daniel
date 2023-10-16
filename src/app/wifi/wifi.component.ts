import { Component, OnInit } from '@angular/core';
import { Clientes, Modem, Wifi } from '../model';
import { Text } from '../text';
import { ClienteService, PlanosService, PlataformaService } from '../services';


@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.component.html',
  styleUrls: ['./wifi.component.scss']
})
export class WifiComponent implements OnInit {

  public Franquia: string  = Text.aFranquia
  public mensagemcliente: string  = Text.mensagemcliente
  public choicePlan: string = Text.choicePlan
  public chosenPlan: string = Text.chosenPlan
  wifi = {} as Wifi;
  roteador: Wifi[];

  modem = {} as Modem;
  sinal: Modem[]
  public EstadoList: Array<string> = [];

  client = {} as Clientes;
  clients: Clientes[];

  value: any;


  constructor(
    private plataformaService: 
    PlataformaService, 
    private planoService: PlanosService, 
    private clientService: ClienteService,

    ) { 

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




}
