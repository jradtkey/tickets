import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';



@Component({
  selector: 'app-property-create',
  templateUrl: './property-create.component.html',
  styleUrls: ['./property-create.component.css']
})
export class PropertyCreateComponent implements OnInit {

  myControl = new FormControl();
  otherControl = new FormControl();
  anotherControl = new FormControl();
  options1: string[] = ['One', 'Two', 'Three'];
  options2: string[] = ['Four', 'Five', 'Six'];
  options3: string[] = ['Seven', 'Eight', 'Nine'];
  filteredOptions1: Observable<string[]>;
  filteredOptions2: Observable<string[]>;
  filteredOptions3: Observable<string[]>;

  constructor() { }

  ngOnInit() {

    this.filteredOptions1 = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.filteredOptions2 = this.otherControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter2(value))
      );

    this.filteredOptions3 = this.anotherControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter3(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options1.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options2.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filter3(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options3.filter(option => option.toLowerCase().includes(filterValue));
  }

}
