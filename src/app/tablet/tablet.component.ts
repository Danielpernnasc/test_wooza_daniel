import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { PlataformaService, ClienteService} from '../services';
import { Plataforma, Clientes, Plano } from '../model';




@Component({
  selector: 'app-tablet',
  templateUrl: './tablet.component.html',
  styleUrls: ['./tablet.component.scss']
})
export class TabletComponent implements OnInit {

  public maskfone = ['(',/[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/,/\d/,/\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskcep = [/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/];
  public maskcpf = [/\d/,/\d/,'.',/\d/,/\d/,'.',/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/,]

  plataforma = {} as Plataforma;
  plataformas: Plataforma[];

  plano = {} as Plano;
  planos: Plano[];

  cliente = {} as Clientes;
  clientes: Clientes[];

  constructor(private plataformaService: PlataformaService, private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.getClientes();
  }



  getPlataformas(id: number) {
    this.plataformaService.getPlataformas(id).subscribe((plataformas: Plataforma[]) => {
      this.plataformas = plataformas;
    });
  }

  getPlanos() {
    this.plataformaService.getPlanos().subscribe((planos: Plano[]) => {
      this.planos = planos
    })
  }
   saveClient(form: NgForm) {
    if (this.cliente.id ! == undefined) {
      this.clienteService.updateClient(this.cliente).subscribe(() => {
        // this.cleanForm(form)
      });
    }else {
      this.clienteService.saveClient(this.cliente).subscribe(() => {
        // this.cleanForm(form);
      })
    }
  }
  getClientes() {
    this.clienteService.getClient().subscribe((clientes: Clientes[]) => {
      this.clientes = clientes;
    });
  }
  editClient(cliente: Clientes) {
    this.cliente = {...cliente}

  }

  deleteClient(cliente: Clientes) {
    this.clienteService.deleteClient(cliente).subscribe(() => {
      this.getClientes();
    });
  }

  // cleanForm(form: NgForm) {
  //   this.getPlataformas();
  //   form.resetForm();
  //   this.plataforma = {} as Plataforma;
  // }


  Franquia = "Contrate a Franquia de 5GB para acessar internet";
  porapenas = "$ 49,90";
  mensagemcliente = "Preencha os dados abaixo e eviaremos o chip em até 3 dias uteis"

}
