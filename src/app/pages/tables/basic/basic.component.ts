import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/dataService';
import { Account } from 'src/app/entity/account.entity';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})

/**
 * Basic-Table Component
 */
export class BasicComponent implements OnInit {

   // bread crumb items
   breadCrumbItems!: Array<{}>;
   dataAccount!: Account[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    console.log('------------------------');
    this.dataService.sendGetRequest().subscribe((response: any) => {
      this.dataAccount = response;
      console.log(response);
    });

    //BreadCrumb 
    this.breadCrumbItems = [
      { label: 'Tables' },
      { label: 'Basic Tables', active: true }
    ];
  }

}
