import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { PlataformaService, PlanosService, ClienteService} from '../services';
import { Tablet, Clientes, Plano, TI00001 } from '../model';


declare var $: any;


@Component({
  selector: 'app-tablet',
  templateUrl: './tablet.component.html',
  styleUrls: ['./tablet.component.scss']
})
export class TabletComponent implements OnInit {

  public maskfone = ['(',/[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/,/\d/,/\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskcep = [/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/];
  public maskcpf = [/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/,];

  UF: any = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
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

  TI01 = {} as TI00001;
  TI01s:  TI00001[];

  client = {} as Clientes;
  clients: Clientes[];

  value: any;


  constructor(private plataformaService: PlataformaService, 
    private planoService: PlanosService, 
    private clientService: ClienteService) {}

  ngOnInit(): void {
    this.getPlataformasTablet();
    this.getPlanos();
    this.getTI01();
    this.getClient();
    // $(".btn_choose").click(function(){
    //   console.log(".btn_choose");
    //   var text = $(this).text();
    //   $(".planoesecolhido").val(text);
    // });

  }

  // displayVals() {
  //   $("#single").val();
  //   $(".sku").html("Plano Escolhido");
  // }

  changed(value) {
    this.value = value;
  }
  changeState(e) {
    this.value = e;
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

  getTI01() {
    this.planoService.getTI01().subscribe((TI01: TI00001[]) => {
      this.TI01s = TI01;
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
  mensagemcliente = "Preencha os dados abaixo e eviaremos o chip em até 3 dias uteis";

}
