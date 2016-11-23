import { Component, Input } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CalculatorService } from './calculator.service'

@Component({
    selector: 'calculator',
    template: `<div class="calculator">
                 <!-- Display section -->
                 
                 <span id="calculatorScreen" 
                       class="calculatorScreen" 
                       style="display: block">
                    {{_displayValue}}
                 </span>

                 <!-- Button section -->
                 <button class="btn btn-default btn-lg calculatorButton" (click)='display(7)'>7</button>
                 <button class="btn btn-default btn-lg calculatorButton" (click)='display(8)'>8</button>
                 <button class="btn btn-default btn-lg calculatorButton" (click)='display(9)'>9</button>                    
                 <button class="btn btn-default btn-lg calculatorButton" (click)='divide()'>&divide;</button>

                 <button class="btn btn-default btn-lg  calculatorButton" (click)='display(4)'>4</button>
                 <button class="btn btn-default btn-lg  calculatorButton" (click)='display(5)'>5</button>
                 <button class="btn btn-default btn-lg  calculatorButton" (click)='display(6)'>6</button>                    
                 <button class="btn btn-default btn-lg  calculatorButton" (click)='multiply()'>&times;</button>
                 <button class="btn btn-default btn-lg  calculatorButton" (click)='display(1)'>1</button>
                 <button class="btn btn-default btn-lg  calculatorButton" (click)='display(2)'>2</button>
                 <button class="btn btn-default btn-lg  calculatorButton" (click)='display(3)'>3</button>
                 <button class="btn btn-default btn-lg calculatorButton" (click)='subtract()'>-</button>

                 <button class="btn btn-default btn-lg calculatorButton" (click)='clear()'>C</button>
                 <button class="btn btn-default btn-lg calculatorButton" (click)='display(0)'>0</button>
                 <button class="btn btn-default btn-lg calculatorButton" (click)='calculateResult()'>=</button>
                 <button class="btn btn-default btn-lg calculatorButton" (click)='add()'>+</button>
            </div>`,
    providers: [CalculatorService]
})
export class CalculatorComponent {   
    _displayValue = '0';
    _memoryValue: any = null;
    _operation = '';
    _calcService: CalculatorService; 

    constructor(calculatorServ: CalculatorService) {
        this._calcService = calculatorServ;
    }

    display(num: string) {
        this._displayValue = num;
        this.SaveValue();
    }

    SaveValue() {
        if (this._memoryValue == null)
            this._memoryValue = this._displayValue;
    }

    add() {
        this.SaveValue();
        this._operation = "add";
        this._displayValue = '0';
    }

    subtract() {
        this.SaveValue();
        this._operation = "subtract";
        this._displayValue = '0';
    }

    divide() {
        this.SaveValue();
        this._operation = "divide";
        this._displayValue = '0';
    }

    multiply() {
        this.SaveValue();
        this._operation = "multiply";
        this._displayValue = '0';
    }

    clear() {
        this._memoryValue = null;
        this._displayValue = '0';
        this._operation = '';  
    }

    //Calls a REST WebAPI Calculator service to perform the arithmetic calculations
    // - An asynchronous ajax call is made to the server
    // - The result is returned in json format
    calculateResult() {
        this._calcService.calculateResult(
            parseFloat(this._memoryValue),
            parseFloat(this._displayValue),
            this._operation
        ).subscribe(
            data => this._displayValue = data,
            error => console.error('Error: ' + error),
            () => console.log('Successful operation')
        );
    }
}
