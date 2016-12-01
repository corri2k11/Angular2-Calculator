"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var calculator_service_1 = require('./calculator.service');
var CalculatorComponent = (function () {
    function CalculatorComponent(calculatorServ) {
        this._displayedValue = '';
        this._inMemoryValue = '0';
        this._operation = '';
        this._resultValue = '0';
        this._tempValue = '';
        this._calcService = calculatorServ;
    }
    CalculatorComponent.prototype.display = function (inputNum) {
        console.log(" _inMemoryValue: " + this._inMemoryValue);
        this._displayedValue += inputNum;
        //if (this._displayedValue === '0' && this._inMemoryValue === '0') {            
        if (this._inMemoryValue == '0') {
            //Replaces the initial zero value displayed in screen and stored in memory with the first entered value
            //this._displayedValue = inputNum;
            this._inMemoryValue = inputNum;
            console.log(" _inMemoryValue: " + this._inMemoryValue);
        }
        else {
            //Appends the last entered value to the lcd display and in memory value
            //this._displayedValue += inputNum;
            this._inMemoryValue = this._inMemoryValue + inputNum;
            console.log("(appended) _inMemoryValue: " + this._inMemoryValue + " result: " + this._resultValue);
        }
    };
    CalculatorComponent.prototype.add = function () {
        console.log("Add");
        this._operation = 'add';
        this._displayedValue += ' + ';
        this.calculateResult(false);
    };
    CalculatorComponent.prototype.subtract = function () {
        console.log("subtract");
        this._operation = 'subtract';
        this._displayedValue += ' - ';
        if ((this._resultValue == '0' && this._displayedValue.match(/-/g) || []).length == 1) {
            this._resultValue = this._inMemoryValue;
        }
        else
            this.calculateResult(false);
        this._inMemoryValue = '0';
    };
    CalculatorComponent.prototype.divide = function () {
        this._operation = 'divide';
        this._displayedValue += ' ÷ ';
        if ((this._resultValue == '0' && this._displayedValue.match(/÷/g) || []).length == 1) {
            this._resultValue = this._inMemoryValue;
        }
        else
            this.calculateResult(false);
        this._inMemoryValue = '0';
    };
    CalculatorComponent.prototype.multiply = function () {
        console.log("Multiply");
        this._operation = 'multiply';
        this._displayedValue += ' × ';
        if ((this._resultValue == '0' && this._displayedValue.match(/×/g) || []).length == 1) {
            this._resultValue = this._inMemoryValue;
        }
        else
            this.calculateResult(false);
        this._inMemoryValue = '0';
    };
    CalculatorComponent.prototype.clear = function () {
        this._operation = '';
        this._displayedValue = '';
        this._inMemoryValue = '0';
        this._resultValue = '0';
    };
    //Calls a REST WebAPI Calculator service to perform the arithmetic calculations
    // - An asynchronous ajax call is made to the server
    // - The result is returned in json format
    CalculatorComponent.prototype.calculateResult = function (equalBtn) {
        var _this = this;
        this._calcService.calculateResult(parseFloat(this._resultValue), parseFloat(this._inMemoryValue), this._operation).subscribe(function (data) { return _this._resultValue = data; }, function (error) { return console.error('Error: ' + error); }, function () {
            _this._inMemoryValue = '0';
            if (equalBtn)
                _this._displayedValue = _this._resultValue;
            console.log('this._resultValue = ' + _this._resultValue);
            console.log('Successful operation');
        });
    };
    CalculatorComponent = __decorate([
        core_1.Component({
            selector: 'calculator',
            template: "<div class=\"calculator\">\n                 <!-- Display section -->\n                 \n                 <span class=\"calculatorScreen\" \n                       style=\"display: block\">\n                    {{_displayedValue}}\n                 </span>\n\n                 <!-- Button section -->\n                 <button class=\"btn btn-default btn-lg calculatorButton\" (click)=\"display('7')\">7</button>\n                 <button class=\"btn btn-default btn-lg calculatorButton\" (click)=\"display('8')\">8</button>\n                 <button class=\"btn btn-default btn-lg calculatorButton\" (click)=\"display('9')\">9</button>                    \n                 <button class=\"btn btn-default btn-lg calculatorButton\" (click)=\"divide()\">&divide;</button>\n\n                 <button class=\"btn btn-default btn-lg  calculatorButton\" (click)=\"display('4')\">4</button>\n                 <button class=\"btn btn-default btn-lg  calculatorButton\" (click)=\"display('5')\">5</button>\n                 <button class=\"btn btn-default btn-lg  calculatorButton\" (click)=\"display('6')\">6</button>                    \n                 <button class=\"btn btn-default btn-lg  calculatorButton\" (click)=\"multiply()\">&times;</button>\n\n                 <button class=\"btn btn-default btn-lg  calculatorButton\" (click)=\"display('1')\">1</button>\n                 <button class=\"btn btn-default btn-lg  calculatorButton\" (click)=\"display('2')\">2</button>\n                 <button class=\"btn btn-default btn-lg  calculatorButton\" (click)=\"display('3')\">3</button>\n                 <button class=\"btn btn-default btn-lg calculatorButton\" (click)=\"subtract()\">-</button>\n\n                 <button class=\"btn btn-default btn-lg calculatorButton\" (click)=\"clear()\">C</button>\n                 <button class=\"btn btn-default btn-lg calculatorButton\" (click)=\"display('0')\">0</button>\n                 <button class=\"btn btn-default btn-lg calculatorButton\" (click)=\"calculateResult(true)\">=</button>\n                 <button class=\"btn btn-default btn-lg calculatorButton\" (click)=\"add()\">+</button>\n            </div>",
            providers: [calculator_service_1.CalculatorService]
        }), 
        __metadata('design:paramtypes', [calculator_service_1.CalculatorService])
    ], CalculatorComponent);
    return CalculatorComponent;
}());
exports.CalculatorComponent = CalculatorComponent;
//# sourceMappingURL=calculator.component.js.map