import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from 'src/app/entity/account.entity';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private REST_API_SERVER = 'http://localhost:8080';
    private ACCOUNT_SUB = 'account';

    constructor(private httpClient: HttpClient) { }


    public sendGetRequest(): Observable<Account> {
        return this.httpClient.get<Account>(this.REST_API_SERVER + '/' + this.ACCOUNT_SUB).pipe();
    }
}