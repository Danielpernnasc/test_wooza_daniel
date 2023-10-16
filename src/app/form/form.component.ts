import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Clientes } from '../model';
import { Produtos } from '../produtos';
import { ClienteService, EstadoService } from '../services';
import {Text} from '../text';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public listDesktop: Produtos;
  public listWifi: Produtos;
  public listMobile: Produtos;
  value: any;
  constructor(  
    private clientService: ClienteService, 
    public listadosEstado: EstadoService,
    public caracterSpecial: EstadoService,
    public router: Router
    ) { this.listDesktop = new Produtos(),
      this.listWifi = new Produtos(),
      this.listMobile = new Produtos();
    }
  client = {} as Clientes;
  public caracterEspecialFONE: Array<string | RegExp> = [];
  public caracterEspecialCEP: Array<string | RegExp> = [];
  public caracterEspecialCPF: Array<string | RegExp> = [];
  public EstadoList: Array<string> = [];
  public choicePlan: string = Text.choicePlan;
  public chosenPlan: string = Text.chosenPlan;

  desktop!: boolean;
  wifi!: boolean;
  mobile!: boolean;

  ngOnInit(): void {
    this.caracterEspeciais()
    this.showSelect();
    
  }
  public caracterEspeciais(){
    this.caracterEspecialFONE = this.caracterSpecial.RegExpCarcterFone();
    this.caracterEspecialCEP = this.caracterSpecial.RegExpCarcterCEP();
    this.caracterEspecialCPF = this.caracterSpecial.RegExpCarcterCPF();
    this.EstadoList = this.listadosEstado.listasEstado();
  }

  showSelect(){
    const pgDesktop = '/desktop';
    const pgWifi = '/wifi';
    if(pgDesktop == this.router.url){
      this.desktop = true;
    }else if(pgWifi == this.router.url){
      this.wifi = true;
    }else {
      this.mobile = true;
    }
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
      //this.getClient();
    });
  }
  changed(value) {
    this.value = value;
  }
  editClient(cliente: Clientes) {
    this.client = {...cliente};
  }

  cleanForm(form: NgForm) {
    //this.getClient();
    form.resetForm();
    this.client = {} as Clientes;
  }

}
