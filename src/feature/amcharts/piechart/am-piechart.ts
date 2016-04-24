import {autoinject, customElement, bindable,child} from 'aurelia-framework';
import 'amcharts';
import 'amcharts.pie';
import 'amcharts.export';

@customElement('am-piechart')
@autoinject
export class AmPieChartComponent {
  @bindable dataProvider;
  @bindable categoryField:string;
  @bindable valueField:string;
  @bindable innerRadius:number=0 ;
  @bindable depth:number=10;
  @bindable angle:number=30;
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
    this.chart.dataProvider = this.dataProvider;
    this.chart.valueField = this.valueField;
    this.chart.titleField = this.categoryField;
    this.chart.depth3D=this.depth;
    this.chart.angle=this.angle;
    this.chart.innerRadius=this.innerRadius;
    this.chart.write(this.child);
  }

  depthChanged(newValue, oldValue) {
    var value = Number(newValue);
    this.chart.startDuration = 0;
    this.chart['depth3D'] = value;
    this.chart.validateNow();
  }

  angleChanged(newValue, oldValue) {
    var value = Number(newValue);
    this.chart.startDuration = 0;
    this.chart['angle'] = value;
    this.chart.validateNow();
  }

  innerRadiusChanged(newValue, oldValue) {
    let value = newValue;
    this.chart.startDuration = 0;
    this.chart['innerRadius'] = value += "%";
    this.chart.validateNow();
  }
}
