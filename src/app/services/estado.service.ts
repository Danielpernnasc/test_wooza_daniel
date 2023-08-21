import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  public listEstado: Array<string> = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ]
  public maskNumberFone: Array<string | RegExp> = [ '(',/[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/,/\d/,/\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskNumberCep: Array<string | RegExp> = [/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/];
  public maskNumberCPF: Array<string | RegExp> = [/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/,];

  constructor() { }

  public listasEstado(){
    return this.listEstado
  }

  public RegExpCarcterFone() {
    return this.maskNumberFone 
   
  }
  public RegExpCarcterCEP() {
    return this.maskNumberCep
   
  }
  public RegExpCarcterCPF() {
    return this.maskNumberCPF
   
  }
}
