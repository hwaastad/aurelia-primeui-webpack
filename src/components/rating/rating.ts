export class RationDemo {
  val1: number;

  val2: number;

  val3: number;

  val4: number = 5;

  msg: string;

  handleRate(event) {
    this.msg = "You have rated " + event.value;
  }

  handleCancel(event) {
    this.msg = "Rating Cancelled";
  }
}
