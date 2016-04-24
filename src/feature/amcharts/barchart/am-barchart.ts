import {autoinject, customElement, bindable,child} from 'aurelia-framework';

@customElement('am-barchart')
@autoinject
export class AmBarChartComponent {
  @bindable dataProvider;
  @bindable innerRadius;
  @bindable depth;
  @bindable angle;
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
    this.chart.valueField = "litres";
    this.chart.titleField = "country";
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
