import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { PlataformaService, PlanosService, ClienteService} from '../services';
import { Tablet, Clientes, Plano } from '../model';
import { EstadoService } from '../services';
import { Produtos } from '../produtos';
import { Text } from '../text';


declare var $: any;


@Component({
  selector: 'app-tablet',
  templateUrl: './tablet.component.html',
  styleUrls: ['./tablet.component.scss']
})
export class TabletComponent implements OnInit {



  public caracterEspecialFONE: Array<string | RegExp> = [];
  public caracterEspecialCEP: Array<string | RegExp> = [];
  public caracterEspecialCPF: Array<string | RegExp> = [];
  public listMobile: Produtos;

  public EstadoList: Array<string> = [];
  public Franquia: string  = Text.aFranquia
  public mensagemcliente: string  = Text.mensagemcliente


  

  tablet = {} as Tablet;
  mobile: Tablet[];

  plano = {} as Plano;
  planos: Plano[];



  client = {} as Clientes;
  clients: Clientes[];

  value: any;


  constructor(private plataformaService: PlataformaService, 
    private planoService: PlanosService, 
    private clientService: ClienteService,
    private listadosEstado: EstadoService,
    private caracterSpecial: EstadoService) {
      this.listMobile = new Produtos();
    }

  ngOnInit(): void {
    this.getPlataformasTablet();
    this.getPlanos();
    this.getClient();
    this.chamarListaEstado();
    this.caracterEspeciais();

    // $(".btn_choose").click(function(){
    //   console.log(".btn_choose");
    //   var text = $(this).text();
    //   $(".planoesecolhido").val(text);
    // });

  }
  
  public chamarListaEstado(){
    this.EstadoList = this.listadosEstado.listasEstado()
  }
  public caracterEspeciais(){
    this.caracterEspecialFONE = this.caracterSpecial.RegExpCarcterFone();
    this.caracterEspecialCEP = this.caracterSpecial.RegExpCarcterCEP();
    this.caracterEspecialCPF = this.caracterSpecial.RegExpCarcterCPF();
  }
  // displayVals() {
  //   $("#single").val();
  //   $(".sku").html("Plano Escolhido");
  // }

  changed(value) {
    this.value = value;
  }
  getPlataformasTablet() {
    this.plataformaService.getPlataformasTablet().subscribe((mobile: Tablet[]) => {
      this.mobile = mobile;
    });
  }

  getPlanos() {
    this.planoService.getPlanos().subscribe((plano: Plano[]) => {
      this.planos = plano;
    });
  }



  getClient() {
    this.clientService.getClient().subscribe((client: Clientes[]) => {
      this.clients= client
    })
  }

  saveClient(form: NgForm) {
    // if (this.client.id !== undefined) {
    //   this.clientService.updateClient(this.client).subscribe(() => {
    //     this.cleanForm(form);
    //   });
    // } else {
    //   this.clientService.saveClient(this.client).subscribe(() => {
    //     this.cleanForm(form);
    //   })
    // }
    this.clientService.saveClient(this.client).subscribe({
      next: ((res) => {
        res
        console.log(res, 'Respostas');
      }),
    
      error: (erro => erro)
    });
    
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




}
