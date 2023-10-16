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







  public Franquia: string  = Text.aFranquia
  public mensagemcliente: string  = Text.mensagemcliente


  

  tablet = {} as Tablet;
  mobile: Tablet[];

  plano = {} as Plano;
  planos: Plano[];



  client = {} as Clientes;
  clients: Clientes[];




  constructor(private plataformaService: PlataformaService, 
    private planoService: PlanosService, 
    private clientService: ClienteService,
    private listadosEstado: EstadoService,
    private caracterSpecial: EstadoService) {
      
    }

  ngOnInit(): void {
    this.getPlataformasTablet();
    this.getPlanos();
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

 




}
