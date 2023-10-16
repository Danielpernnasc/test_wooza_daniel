import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { PlataformaService, PlanosService, ClienteService} from '../services';
import { Tablet, Clientes, Plano } from '../model';
import { EstadoService } from '../services';


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

  public EstadoList: Array<string> = [];

  PLANO: any = [
    'TI00001NA_NOVA_LINHA 1GB',
    'TI00002NA_NOVA_LINHA 2GB',
    'TI00003NA_NOVA_LINHA 4GB',
    'TI00004NA_NOVA_LINHA 6GB',
    'TI00005NA_NOVA_LINHA 10GB'
  ];


  

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
    private caracterSpecial: EstadoService) {}

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

  Franquia = "Contrate a Franquia de 5GB para acessar internet";
  mensagemcliente = "Preencha os dados abaixo e eviaremos o chip em até 3 dias uteis";

}
