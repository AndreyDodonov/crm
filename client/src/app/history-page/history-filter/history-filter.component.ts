import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild} from '@angular/core';
import {Filter} from '../../shared/interfaces';
import {MaterialDatePicker, MaterialService} from '../../shared/classes/material.service';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.css']
})
export class HistoryFilterComponent implements  OnDestroy, AfterViewInit {

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onFilter = new EventEmitter<Filter>();
  @ViewChild('start', {static: false}) startRef: ElementRef;
  @ViewChild('end', {static: false}) endRef: ElementRef;

  order: number;
  start: MaterialDatePicker;
  end: MaterialDatePicker;
  isValid = true;

  ngOnDestroy(): void {
    this.start.destroy();
    this.end.destroy();
  }

  ngAfterViewInit(): void {
    this.start = MaterialService.initDatepicker(this.startRef, this.validate.bind(this));
    this.end = MaterialService.initDatepicker(this.endRef, this.validate.bind(this));
  }

  validate() {
    if (!this.start.date || !this.end.date) {
      this.isValid = true;
      return;
    }
    this.isValid = this.start.date < this.end.date;
  }

  submitFilter() {
    const filter: Filter = {};

    if (this.order) {
      filter.order = this.order;
    }
    if (this.start.date) {
      filter.start = this.start.date;
    }
    if (this.end.date) {
      filter.end = this.end.date;
    }

    this.onFilter.emit(filter);
  }

  clearFilter() {

    const filter: Filter = {};

    this.onFilter.emit(filter);

  }

}
