export class AmChartsPieDemo {
  heading = 'Chart Render';
  val1: string;
  val2: string = 'Option 2';
  chartData = [];
  data = [];

  constructor(){
    this.data = [
      {
        "country": "Lithuania",
        "litres": 501.9
      },
      {
        "country": "Czech Republic",
        "litres": 301.9
      },
      {
        "country": "Ireland",
        "litres": 201.1
      },
      {
        "country": "Germany",
        "litres": 165.8
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

    update(event) {
      console.dir(event.detail.value);
      this.val1 = event.detail.value;
    }


    handleChange(event) {
      console.log('handle change');
    }
  }
