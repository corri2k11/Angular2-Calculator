import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class CalculatorService {
    _baseUrl: string;  //Base WebAPI url

    constructor(private _http: Http) {              
        this._baseUrl = window.location.protocol + '//' +
                        window.location.hostname + ':' +
                        window.location.port + "/";
    }

    public calculateResult(num1: number, num2: number, operation: string) {
        let _fullUrl = this._baseUrl + 'api/calculator/' + num1 + '/' + num2 + '/' + operation;
        return this._http.get(_fullUrl).map(resp => { return resp.json() });
    }
}
