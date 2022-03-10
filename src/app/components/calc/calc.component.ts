import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'calculadora',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {

  nome = "Paulo"
  resultMemory = "";
  result = "";
  isOperador = false;
  isCalc = false;
  countOP = 0;
  isOP = false;

  constructor(){}

  ngOnInit(): void {}

  addItem(ev: any){
    // console.log(ev.target.title)

    this.isOP = ev.target.value === "operador";
    // Tratamento para subistuir operador
    if (this.isOP && this.isOperador) {
      this.result = this.result.slice(0, this.result.length - 1) + ev.target.title;
    } else if (this.isOP && this.countOP == 1) {
      // console.log("Count: ", countoperador);
      const soma = eval(this.result).toString().slice(0, 5);
      this.resultMemory = this.result + " = " + soma;
      this.result = soma + ev.target.title;
      this.isOperador = this.isOP;
      this.isCalc =false;
    } else {
      this.isCalc
        ? !this.isOP
          ? this.result = ev.target.title
          : this.result = this.result + ev.target.title
        : this.result = this.result + ev.target.title;
      if(this.isOP){ this.countOP = 1;}
      this.isOperador = this.isOP ;
      this.isCalc = false;
    }
  }

  calc(){
    if(this.result){
      let soma = eval(this.result)
      this.resultMemory = this.result + " = " + soma;
      this.result = soma;
    }else{ console.log("not Expression")}
  }
  clear(){
    this.result = ""
    this.countOP = 0
  }

  raiz(){
    if(this.result && !this.isOP){
    const raiz = Math.sqrt(Number(this.result));
    this.resultMemory = "raiz "+this.result + " = " + raiz
   isNaN(raiz)
     ? alert("Calculo invalido")
     : this.result = raiz.toString().slice(0, 10);
   }else{
     alert("Calculo invalido");
   }
  }

  calcPorcentagem(){
    const element = this.result.split(/[+|*|-|\/]/g);
       const operador = this.result.replace(/\d/g, "").replace(".", "");
       try {
         const calc =
           operador != "*"
             ? eval(
                 `${element[0]} ${operador} (${element[0]} * (${element[1]} / 100))`
               )
             : eval(`${element[0]} * (${element[1]} / 100)`);

         this.result = calc.toFixed(2).toString().slice(0, 5);
         this.resultMemory = this.result + "% = " + calc.toFixed(2).toString().slice(0, 5);

         this.isCalc = true;
         this.countOP = 0;
       } catch (error) {
         alert("Calculo invalido");
       }
  }

}
