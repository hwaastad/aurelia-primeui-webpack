import {autoinject, customElement, bindable,child} from 'aurelia-framework';
import 'amcharts';
import 'amcharts.pie';
import 'amcharts.export';

@customElement('am-donut')
@autoinject
export class AmDonutComponent {
  @bindable dataProvider;
  @bindable categoryField:string;
  @bindable valueField:string;
  @bindable innerRadius:string="40%";
  gradientRatio:number[]=[-0.4, -0.4, -0.4, -0.4, -0.4, -0.4, 0, 0.1, 0.2, 0.1, 0, -0.2, -0.5];
  @bindable export:boolean = false;
  chart;
  @child('div') child;

  constructor(private element: Element) {
    this.element = element;
  }

  attached() {
    this.createPieChart();
  }

  createPieChart() {
    this.chart = new AmCharts.AmPieChart();
    this.chart.export={enabled:this.export};
    this.chart.theme="none";
    this.chart.dataProvider = this.dataProvider;
    this.chart.valueField = this.valueField;
    this.chart.titleField = this.categoryField;
    this.chart.innerRadius=this.innerRadius;
    this.chart.gradientRatio=this.gradientRatio;
    this.chart.balloonText= "[[value]]";
    this.chart.balloon={
      "drop": true,
      "adjustBorderColor": false,
      "color": "#FFFFFF",
      "fontSize": 16
    };
    this.chart.write(this.child);
  }
}
