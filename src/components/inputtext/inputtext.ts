export class InputTextDemo {
  text: string;

  disabled: boolean = true;

  toggleDisabled() {
    this.disabled = !this.disabled;
  }
}
