import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from 'src/app/core/services/dataService';
import { Account } from 'src/app/entity/account.entity';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})

/**
 * Basic-Table Component
 */
export class BasicComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

   // bread crumb items
   breadCrumbItems!: Array<{}>;
   dataAccount!: Account[];

  constructor(private dataService: DataService) { }

  someClickHandler(info: any): void {
    console.log(info);
    this.confirm(info[9], info[0]);
  }

  confirm(indicativo: string, idu: string) {
    Swal.fire({
      title: 'Seguro que quiere borrar a ' + indicativo + ' ?',
      text: 'No podras deshacer esta accion!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Si, borrar!',
    }).then((result) => {
      if (result.value) {
        this.dataService.delete(idu)
        .then((r) => {
          if (Boolean(r)){
            Swal.fire('Borrado!', 'El registro ha sido borrado.', 'success');
          }
          else {
            Swal.fire('Error!', 'El registro no pudo borrarse.', 'error');
          }
        })
        .catch(e => console.error(e))
        .finally(() => {
          this.dataService.sendGetRequest().subscribe((response: any) => {
            this.dataAccount = response;
          });
        });
      }
    });
  }

  ngOnInit(): void {
    console.log('------------------------');
    this.dataService.sendGetRequest().subscribe((response: any) => {
      this.dataAccount = response;
      console.log(response);
      this.dtTrigger.next();
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      rowCallback: (row: Node, data: Account[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        // Note: In newer jQuery v3 versions, `unbind` and `bind` are 
        // deprecated in favor of `off` and `on`
        $('td', row).off('click');
        $('td', row).on('click', () => {
          self.someClickHandler(data);
        });
        return row;
      }
    };

    //BreadCrumb 
    this.breadCrumbItems = [
      { label: 'Tables' },
      { label: 'Basic Tables', active: true }
    ];
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
