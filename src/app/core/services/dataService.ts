import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from 'src/app/entity/account.entity';
import { AsocEstatal } from 'src/app/entity/asocEstatal.entity';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private REST_API_SERVER = 'http://localhost:8080';

    private ACCOUNT_SUB = 'account';
    private ASOCESTATAL_SUB = 'asocestatal';
    status: boolean | undefined = false;

    constructor(private httpClient: HttpClient) { }


    public sendGetRequest(): Observable<Account> {
        return this.httpClient.get<Account>(this.REST_API_SERVER + '/' + this.ACCOUNT_SUB).pipe();
    }

    // tslint:disable-next-line:typedef
    public delete(idu: string): Promise<object>{
        return this.httpClient.delete(this.REST_API_SERVER + '/' + this.ACCOUNT_SUB + '/' + idu).toPromise();
    }

    // tslint:disable-next-line:typedef
    public getAsocEstatales(): Promise<AsocEstatal[]>{
        return this.httpClient.get<AsocEstatal[]>(this.REST_API_SERVER + '/' + this.ASOCESTATAL_SUB).toPromise();
    }
}
