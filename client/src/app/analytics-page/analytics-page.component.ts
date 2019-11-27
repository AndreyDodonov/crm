import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {AnalyticService} from '../shared/services/analytic.service';
import {AnalyticsPage} from '../shared/interfaces';
import {Subscription} from 'rxjs';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements OnDestroy, AfterViewInit {

  @ViewChild('gain', {static: false}) gainRef: ElementRef;
  @ViewChild('order', {static: false}) orderRef: ElementRef;

  average: number;
  pending = true;
  aSub: Subscription;

  constructor(private service: AnalyticService) {
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    const gainConfig: any = {
      label: 'Выручка',
      color: 'rgb(255, 99, 132)'

    };

    const orderConfig: any = {
      label: 'Заказы',
      color: 'rgb(100, 99, 255)'

    };

    this.aSub = this.service.getAnalytics().subscribe((data: AnalyticsPage) => {
      this.average = data.average;

      gainConfig.labels = data.chart.map(item => item.label);
      gainConfig.data = data.chart.map(item => item.gain);

      orderConfig.labels = data.chart.map(item => item.label);
      orderConfig.data = data.chart.map(item => item.order);

      const gainContext = this.gainRef.nativeElement.getContext('2d');
      gainContext.canvas.height = '300 px';

      const orderContext = this.orderRef.nativeElement.getContext('2d');
      orderContext.canvas.height = '300 px';

      // tslint:disable-next-line:no-unused-expression
      new Chart(gainContext, createChartConfig(gainConfig));

      // tslint:disable-next-line:no-unused-expression
      new Chart(orderContext, createChartConfig(orderConfig));

      this.pending = false;
    });
  }

}

function createChartConfig({labels, data, label, color}) {
  return {
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets: [
        {
          label, data,
          borderColor: color,
          steppedLine: false,
          fill: false
        }
      ]
    }
  };

}
