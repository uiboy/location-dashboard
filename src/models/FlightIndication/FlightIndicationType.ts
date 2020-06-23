export default class FlightCostIndicationType {
  static economical = new FlightCostIndicationType('ECONOMICAL');
  static moderate = new FlightCostIndicationType('MODERATE');
  static expensive = new FlightCostIndicationType('EXPENSIVE');

  static _values = [
    FlightCostIndicationType.economical,
    FlightCostIndicationType.moderate,
    FlightCostIndicationType.expensive
  ];
  code: string;
  constructor(code: string) {
    this.code = code;
  }

  static parse(code: string): FlightCostIndicationType {
    let keyword;
    for (let i = 0; i < FlightCostIndicationType._values.length; i++) {
      const value = FlightCostIndicationType._values[i];
      if (code === value.code) {
        keyword = value;
        break;
      }
    }

    if (!keyword) console.error('Unsupported flight cost indication type');

    return keyword;
  }
}
