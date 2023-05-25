import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProperrtyBase } from 'src/app/model/ipropertybase';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  SellRent = 1;
  properties: IProperrtyBase[];
  City = '';
  SearchCity = '';
  SortParam = '';
  SortDirection = 'asc';

  constructor(
    private housingservice: HousingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.url.toString()) {
      this.SellRent = 2; //Means We are on Rent-Property URl else we are on base URL
    }
    this.housingservice.getAllProperties(this.SellRent).subscribe(
      (data) => {
        this.properties = data;
      },
      (error) => {
        console.log('httperror');
        console.log(error);
      }
    );
  }

  onCityFilter() {
    this.SearchCity = this.City;
  }
  onCityClearFilter() {
    this.City = '';
    this.SearchCity = '';
  }
  onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }
}
