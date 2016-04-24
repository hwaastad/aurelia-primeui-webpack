import {Message} from '../../feature/prime/api/message';

export class AmChartsBarDemo {
  heading = 'Chart Render';
  val1: string;
  val2: string = 'Option 2';
  chartData = [];
  data = [];
  msgs: Message[];
  constructor(){
    this.data = [{
      "country": "USA",
      "visits": 4025,
      "color": "#FF0F00"
    }, {
      "country": "China",
      "visits": 1882,
      "color": "#FF6600"
    }, {
      "country": "Japan",
      "visits": 1809,
      "color": "#FF9E01"
    }, {
      "country": "Germany",
      "visits": 1322,
      "color": "#FCD202"
    }, {
      "country": "UK",
      "visits": 1122,
      "color": "#F8FF01"
    }, {
      "country": "France",
      "visits": 1114,
      "color": "#B0DE09"
    }, {
      "country": "India",
      "visits": 984,
      "color": "#04D215"
    }, {
      "country": "Spain",
      "visits": 711,
      "color": "#0D8ECF"
    }, {
      "country": "Netherlands",
      "visits": 665,
      "color": "#0D52D1"
    }, {
      "country": "Russia",
      "visits": 580,
      "color": "#2A0CD0"
    }, {
      "country": "South Korea",
      "visits": 443,
      "color": "#8A0CCF"
    }, {
      "country": "Canada",
      "visits": 441,
      "color": "#CD0D74"
    }, {
      "country": "Brazil",
      "visits": 395,
      "color": "#754DEB"
    }, {
      "country": "Italy",
      "visits": 386,
      "color": "#DDDDDD"
    }, {
      "country": "Australia",
      "visits": 384,
      "color": "#999999"
    }, {
      "country": "Taiwan",
      "visits": 338,
      "color": "#333333"
    }, {
      "country": "Poland",
      "visits": 328,
      "color": "#000000"
    }];
  }

  activate() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.chartData = this.data;
        resolve();
      }, 1000);
    });
  }

  update(event) {
    console.dir(event.detail.value);
    this.val1 = event.detail.value;
  }


  handleChange(event) {
    console.log('handle change');
    console.dir(event);
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Country selected', 'detail': 'details: ' + event.chart.category + ' value: ' + event.chart.values.value});
  }
}
