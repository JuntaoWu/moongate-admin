import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { OrderService } from './order.service';




export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'ngx-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  public displayedColumns: any;
  public dataSource: any;
  public currentLength: Observable<number>
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private orderService: OrderService) {

  }
  ngAfterViewInit() {

  }
  ngOnInit(): void {
    this.currentLength = this.orderService.getOrderLength();
    this.orderService.getOrders(5, 0, {
      "status": "ACTIVE",
      "orderType": "PURCHASE"
    }).subscribe(data => {
      this.displayedColumns = ['position', 'name', 'weight', 'symbol']
      const availableOrder = data;
      this.dataSource = new MatTableDataSource<PeriodicElement>(availableOrder);
      this.dataSource.paginator = this.paginator;
    })
  }

  changePage(event: PageEvent) {
    const skip = event.pageIndex * event.pageSize;
    const limit = event.pageSize;
    this.currentLength = this.orderService.getOrderLength();
    this.orderService.getOrders(limit, skip, {
      "status": "ACTIVE",
      "orderType": "PURCHASE"
    }).subscribe(data => {
      this.displayedColumns = ['position', 'name', 'weight', 'symbol']
      const availableOrder = data;
      this.dataSource = new MatTableDataSource<PeriodicElement>(availableOrder);
    })
  }

  applyFilter(event: Event) {
   
  }




}
