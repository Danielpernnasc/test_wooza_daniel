export interface Plano {
  id: number,
  sku: string,
  franquia: string,
  valor: number,
}
// export interface modem {
//   nome: string,
//   valor: number,
//   numParc: number,
//   valorpacela: number,
// }

export interface planoDesk {
  sku: string,
  franquia: string,
  valor: number,
  aparelho: {
    // [key: string]:modem
    nome: string,
    valor: number,
    numParc: number,
    valorpacela: number,
    }
  }
export interface Modem {
    sku: string,
    franquia: number,
    valor: number,
    aparelho: {
      nome: string,
      valor: number,
      numParc: number,
      valorParc: number
    }
}
export interface TI00001 {
  sku: string,
  franquia: string,
  valor: number,
}