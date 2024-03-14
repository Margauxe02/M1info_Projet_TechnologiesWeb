import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  
  constructor(private http: HttpClient) { }

  regions = [];
  
  ngOnInit() {
    this.getRegions();
  }

  getRegions() {
    this.http.get<any[]>('/apiRegions').subscribe(data => {
      this.regions = data;
    });
  }

  departments = [];
  selectedRegion = '';

  selectRegion(region: string) {
    this.selectedRegion = region;
    this.getDepartments(region);
  }

  getDepartments(region: string) {
    this.http.get<any[]>(`/apiDepartments/${region}`).subscribe(data => {
      this.departments = data;
    });
  }

  sports = [];
  selectedDepartment = '';

  selectDepartment(department: string) {
    this.selectedDepartment = department;
    this.getSports(department);
  }

  getSports(department: string) {
    this.http.get<any[]>(`/apiSports/${department}`).subscribe(data => {
      this.sports = data;
    });
  }

  communes = [];
  selectedSport = '';

  getCommunes(sport: string) {
    this.selectedSport = sport;
    const department = this.selectedDepartment;
    this.http.get<any[]>(`/apiCommunes/${department}/${sport}`).subscribe(data => {
      this.communes = data;
    });
  }

  /*getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }*/

}
