import { Component, Input } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CalculatorService } from './calculator.service'

@Component({
    selector: 'calculator',
    template: `<div class="calculator">
                 <!-- Display section -->
                 
                 <span class="calculatorScreen" 
                       style="display: block">
                    {{_displayedValue}}
                 </span>

                 <!-- Button section -->
                 <button class="btn btn-default btn-lg calculatorButton" (click)="display('7')">7</button>
                 <button class="btn btn-default btn-lg calculatorButton" (click)="display('8')">8</button>
                 <button class="btn btn-default btn-lg calculatorButton" (click)="display('9')">9</button>                    
                 <button class="btn btn-default btn-lg calculatorButton" (click)="divide()">&divide;</button>

                 <button class="btn btn-default btn-lg  calculatorButton" (click)="display('4')">4</button>
                 <button class="btn btn-default btn-lg  calculatorButton" (click)="display('5')">5</button>
                 <button class="btn btn-default btn-lg  calculatorButton" (click)="display('6')">6</button>                    
                 <button class="btn btn-default btn-lg  calculatorButton" (click)="multiply()">&times;</button>

                 <button class="btn btn-default btn-lg  calculatorButton" (click)="display('1')">1</button>
                 <button class="btn btn-default btn-lg  calculatorButton" (click)="display('2')">2</button>
                 <button class="btn btn-default btn-lg  calculatorButton" (click)="display('3')">3</button>
                 <button class="btn btn-default btn-lg calculatorButton" (click)="subtract()">-</button>

                 <button class="btn btn-default btn-lg calculatorButton" (click)="clear()">C</button>
                 <button class="btn btn-default btn-lg calculatorButton" (click)="display('0')">0</button>
                 <button class="btn btn-default btn-lg calculatorButton" (click)="calculateResult(true)">=</button>
                 <button class="btn btn-default btn-lg calculatorButton" (click)="add()">+</button>
            </div>`,
    providers: [CalculatorService]
})
export class CalculatorComponent {   
    _displayedValue: string = '';
    _inMemoryValue: string = '0';
    _operation: string = '';
    _resultValue: string = '0';
    _calcService: CalculatorService;

    constructor(calculatorServ: CalculatorService) {
        this._calcService = calculatorServ;
    }

    display(inputNum: string) {
        this._displayedValue += inputNum;

        if (this._inMemoryValue == '0')
            //Replaces the initial zero value displayed in screen and stored in memory with the first entered value
            this._inMemoryValue = inputNum;
        else
            //Appends the last entered value to the lcd display and in memory value
            this._inMemoryValue = this._inMemoryValue + inputNum;
    }

    add() {
        console.log("Add");
        this._operation = 'add';
        this._displayedValue += ' + ';
        this.calculateResult(false);
    }

    subtract() {
        console.log("subtract");
        this._operation = 'subtract';
        this._displayedValue += ' - ';

        if ((this._resultValue == '0' && this._displayedValue.match(/-/g) || []).length == 1) {
            this._resultValue = this._inMemoryValue;
        } else
            this.calculateResult(false);

        this._inMemoryValue = '0';
    }

    divide() {
        this._operation = 'divide';
        this._displayedValue += ' ÷ ';                

        if ((this._resultValue == '0' && this._displayedValue.match(/÷/g) || []).length == 1) {
            this._resultValue = this._inMemoryValue;
        } else
            this.calculateResult(false);

        this._inMemoryValue = '0';
    }

    multiply() {
        console.log("Multiply");
        this._operation = 'multiply';
        this._displayedValue += ' × ';
        
        if ((this._resultValue == '0' && this._displayedValue.match(/×/g) || []).length == 1) {
            this._resultValue = this._inMemoryValue;
        } else
            this.calculateResult(false);

        this._inMemoryValue = '0';
    }

    clear() {
        this._operation = '';
        this._displayedValue = '';
        this._inMemoryValue = '0';
        this._resultValue = '0';  
    }

    //Calls a REST WebAPI Calculator service to perform the arithmetic calculations
    // - An asynchronous ajax call is made to the server
    // - The result is returned in json format
    calculateResult(equalBtn: boolean) {
        this._calcService.calculateResult(
            parseFloat(this._resultValue),
            parseFloat(this._inMemoryValue),
            this._operation
        ).subscribe(
            data => this._resultValue = data,
            error => console.error('Error: ' + error),
            () => {
                this._inMemoryValue = '0';

                if (equalBtn)
                    this._displayedValue = this._resultValue;

                console.log('Successful operation');
            }
        );
    }
}
