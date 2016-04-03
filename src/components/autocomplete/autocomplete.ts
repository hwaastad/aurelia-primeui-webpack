export class AutoCompleteDemo {
  country: any;

  countries: any[];

  filteredCountriesSingle: any[];

  filteredCountriesMultiple: any[];

  brands: string[] = ['Audi','BMW','Fiat','Ford','Honda','Jaguar','Mercedes','Renault','Volvo','VW'];

  filteredBrands: any[];

  brand: string;

  filterCountrySingle(event) {
  }

  filterCountryMultiple(event) {
  }
  filterCountry(query, countries: any[]):any[] {
    return;
  }

  filterBrands(event) {
    console.dir(event);
    this.filteredBrands = [];
    for(let i = 0; i < this.brands.length; i++) {
      let brand = this.brands[i];
      if(brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredBrands.push(brand);
      }
    }
  }

  handleDropdownClick() {
  }

}
