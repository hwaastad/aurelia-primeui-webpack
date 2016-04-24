import {autoinject, customElement, bindable,child} from 'aurelia-framework';
import 'amcharts';
import 'amcharts.serial';
import 'amcharts.export';

@customElement('am-barchart')
@autoinject
export class AmBarChartComponent {
  @bindable dataProvider;
  @bindable innerRadius;
  @bindable categoryField:string;
  @bindable valueField:string;
  @bindable title:string;
  @bindable depth:number=20;
  @bindable angle:number=30;
  @bindable export:boolean = false;
  @bindable onClick;
  chart;
  @child('div') child;

  constructor(private element: Element) {
    this.element = element;
  }

  attached() {
    this.createBarChart();
  }

  createBarChart() {
    this.chart = new AmCharts.AmSerialChart();
    this.chart.export={enabled:this.export};
    this.chart.dataProvider = this.dataProvider;
    this.chart.categoryField = this.categoryField;
    this.chart.type='serial';
    this.chart.startDuration=2;
    this.chart.graphs=[{
      "balloonText": "[[category]]: <b>[[value]]</b>",
      "fillColorsField": "color",
      "fillAlphas": 1,
      "lineAlpha": 0.1,
      "type": "column",
      "valueField": this.valueField
    }];
    this.chart.valueAxes=[{
      "position": "left",
      "title": this.title
    }];
    this.chart.categoryAxis={
      "gridPosition": "start",
      "labelRotation": 90
    };
    this.chart.chartCursor={
      "categoryBalloonEnabled": false,
      "cursorAlpha": 0,
      "zoomable": false
    };
    this.chart.depth3D=this.depth;
    this.chart.angle=this.angle;
    this.chart.addListener("clickGraphItem",e => {
      if(this.onClick){
        this.onClick({originalEvent:event, chart: e.item});
      }
    });
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
}
