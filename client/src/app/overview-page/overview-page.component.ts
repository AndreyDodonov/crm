import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AnalyticService} from '../shared/services/analytic.service';
import {Observable} from 'rxjs';
import {OverviewPage} from '../shared/interfaces';
import {MaterialInstance, MaterialService} from '../shared/classes/material.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tapTarget', {static: false}) tapTargetRef: ElementRef;

  tapTarget: MaterialInstance;
  data$: Observable<OverviewPage>;
  // tslint:disable-next-line:new-parens
  yesterDay = new Date;


  constructor(private service: AnalyticService) { }

  ngOnInit() {
    this.data$ = this.service.getOverview();
    this.yesterDay.setDate(this.yesterDay.getDate() - 1);
  }

  ngOnDestroy(): void {
    this.tapTarget.destroy();
  }

  ngAfterViewInit(): void {
    this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef);
  }

  openInfo() {
    this.tapTarget.open();
  }

}
