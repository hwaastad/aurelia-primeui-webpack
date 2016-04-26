export class AmChartDonutDemo {
  data:any []=[];
  chartData = [];
  constructor(){
    this.data = [{
      "country": "Lithuania",
      "litres": 501.9
    }, {
      "country": "Czech Republic",
      "litres": 301.9
    }, {
      "country": "Ireland",
      "litres": 201.1
    }, {
      "country": "Germany",
      "litres": 165.8
    }, {
      "country": "Australia",
      "litres": 139.9
    }, {
      "country": "Austria",
      "litres": 128.3
    }];
  }

  activate() {
    //return this.chartData = this.data;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.chartData = this.data;
        resolve();
      }, 1000);
    });
  }
}
