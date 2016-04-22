import {bindable,customElement,autoinject,useView} from 'aurelia-framework';

@customElement('p-polarareachart')
@useView('./chart.html')
@autoinject
export class PolarareachartComponent {
  @bindable animation: boolean = true;

  @bindable showScale: boolean = true;

  @bindable scaleOverride: boolean = false;

  @bindable scaleSteps: number = null;

  @bindable scaleStepWidth: number = null;

  @bindable scaleStartValue: number = null;

  @bindable scaleLineColor: string = 'rgba(0,0,0,.1)';

  @bindable scaleLineWidth: number = 1;

  @bindable scaleShowLabels: boolean = true;

  @bindable scaleLabel: string = '<%=value%>';

  @bindable scaleIntegersOnly: boolean = true;

  @bindable scaleFontFamily: string = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";

  @bindable scaleFontSize: number = 12;

  @bindable scaleFontStyle: string = 'normal';

  @bindable scaleFontColor: string = '#666';

  @bindable responsive: boolean = false;

  @bindable maintainAspectRatio: boolean = true;

  @bindable showTooltips: boolean = true;

  @bindable tooltipFillColor: string = 'rgba(0,0,0,0.8)';

  @bindable tooltipFontFamily: string = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";

  @bindable tooltipFontSize: number = 14;

  @bindable tooltipFontStyle: string = 'normal';

  @bindable tooltipFontColor: string = '#fff';

  @bindable tooltipTitleFontFamily: string = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";

  @bindable tooltipTitleFontSize: number = 14;

  @bindable tooltipTitleFontStyle: string = 'bold';

  @bindable tooltipTitleFontColor: string = '#fff';

  @bindable tooltipYPadding: number = 6;

  @bindable tooltipXPadding: number = 6;

  @bindable tooltipCaretSize: number = 8;

  @bindable tooltipCornerRadius: number = 6;

  @bindable tooltipXOffset: number = 10;

  @bindable tooltipTemplate: string = "<%if (label){%><%=label%>: <%}%><%= value %>";

  @bindable multiTooltipTemplate: string = "<%= value %>";

  @bindable value: any[];

  @bindable width: string;

  @bindable height: string;

  @bindable scaleShowLabelBackdrop: boolean = true;

  @bindable scaleBackdropColor: string = "rgba(255,255,255,0.75)";

  @bindable scaleBeginAtZero: boolean = true;

  @bindable scaleBackdropPaddingY: number = 2;

  @bindable scaleBackdropPaddingX: number = 2;

  @bindable scaleShowLine: boolean = true;

  @bindable segmentShowStroke: boolean = true;

  @bindable segmentStrokeColor: string = "#fff";

  @bindable segmentStrokeWidth: number = 2;

  @bindable animationSteps: number = 100;

  @bindable animationEasing: string = "easeOutBounce";

  @bindable animateRotate: boolean = true;

  @bindable animateScale: boolean = false;

  @bindable legend: any;

  @bindable legendTemplate: string = "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>";

  @bindable onSegmentsSelect: any;

  initialized: boolean;

  chart: any;

  differ: any;

  constructor(private element: Element) {
  }

  attached() {
    this.initChart();
    this.initialized = true;
  }

  /*  ngDoCheck() {
  var changes = this.differ.diff(this.value);
  if (changes && this.initialized) {
  if(this.chart) {
  this.chart.destroy();
}

this.initChart();
}
}*/

detached() {
  if(this.chart) {
    this.chart.destroy();
    this.initialized = false;
    this.chart = null;
  }
}

onCanvasClick(event) {
  if(this.chart) {
    let segs = this.chart.getSegmentsAtEvent(event);
    if(segs) {
      if(this.onSegmentsSelect){
        this.onSegmentsSelect({originalEvent: event, segments: segs});
      }
    }
  }
}

initChart() {
  if(this.value) {
    this.chart = new Chart((<HTMLCanvasElement>this.element.firstElementChild.firstElementChild).getContext("2d")).PolarArea(this.value, {
      animation: this.animation,
      showScale: this.showScale,
      scaleOverride: this.scaleOverride,
      scaleSteps: this.scaleSteps,
      scaleStepWidth: this.scaleStepWidth,
      scaleStartValue: this.scaleStartValue,
      scaleLineColor: this.scaleLineColor,
      scaleLineWidth: this.scaleLineWidth,
      scaleLabel: this.scaleLabel,
      scaleShowLabels: this.scaleShowLabels,
      scaleIntegersOnly: this.scaleIntegersOnly,
      scaleFontFamily: this.scaleFontFamily,
      scaleFontSize: this.scaleFontSize,
      scaleFontStyle: this.scaleFontStyle,
      scaleFontColor: this.scaleFontColor,
      responsive: this.responsive,
      maintainAspectRatio: this.maintainAspectRatio,
      showTooltips: this.showTooltips,
      tooltipFillColor: this.tooltipFillColor,
      tooltipFontFamily: this.tooltipFontFamily,
      tooltipFontSize: this.tooltipFontSize,
      tooltipFontStyle: this.tooltipFontStyle,
      tooltipFontColor: this.tooltipFontColor,
      tooltipTitleFontFamily: this.tooltipTitleFontFamily,
      tooltipTitleFontSize: this.tooltipTitleFontSize,
      tooltipTitleFontStyle: this.tooltipTitleFontStyle,
      tooltipTitleFontColor: this.tooltipTitleFontColor,
      tooltipYPadding: this.tooltipYPadding,
      tooltipXPadding: this.tooltipXPadding,
      tooltipCaretSize: this.tooltipCaretSize,
      tooltipCornerRadius: this.tooltipCornerRadius,
      tooltipXOffset: this.tooltipXOffset,
      tooltipTemplate: this.tooltipTemplate,
      multiTooltipTemplate: this.multiTooltipTemplate,
      scaleShowLabelBackdrop: this.scaleShowLabelBackdrop,
      scaleBackdropColor: this.scaleBackdropColor,
      scaleBeginAtZero: this.scaleBeginAtZero,
      scaleBackdropPaddingY: this.scaleBackdropPaddingY,
      scaleBackdropPaddingX: this.scaleBackdropPaddingX,
      scaleShowLine: this.scaleShowLine,
      segmentShowStroke: this.segmentShowStroke,
      segmentStrokeColor: this.segmentStrokeColor,
      segmentStrokeWidth: this.segmentStrokeWidth,
      animationSteps: this.animationSteps,
      animationEasing: this.animationEasing,
      animateRotate: this.animateRotate,
      animateScale: this.animateScale,
      legendTemplate: this.legendTemplate
    });

    if(this.legend) {
      this.legend.innerHTML = this.chart.generateLegend();
    }
  }
}

getCanvas() {
  return this.element.firstElementChild.firstElementChild;
}

getBase64Image() {
  return this.chart.toBase64Image();
}
}
