import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  firstOperand = '';
  secondOperand = '';
  result = 0;

  constructor() {
  }

  ngOnInit(): void {
  }
  doAddition() {
    this.result = parseFloat(this.firstOperand) + parseFloat(this.secondOperand);
  }
  doSubtraction() {
    this.result = parseFloat(this.firstOperand) - parseFloat(this.secondOperand);
  }
  doMultiplication() {
    this.result = parseFloat(this.firstOperand) * parseFloat(this.secondOperand);
  }
  doDivision() {
    this.result = parseFloat(this.firstOperand) / parseFloat(this.secondOperand);
  }
}
