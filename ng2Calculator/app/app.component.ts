import { Component } from '@angular/core';
import { CalculatorComponent } from './calculator.component'

@Component({
    selector: 'my-app',
    template: `<h2>Angular2 Calculator</h2>
               <calculator></calculator>`,
    directives: [CalculatorComponent]
})
export class AppComponent { }
