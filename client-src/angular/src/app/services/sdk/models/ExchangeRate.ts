/* tslint:disable */

declare var Object: any;
export interface ExchangeRateInterface {
  "timestamp"?: Date;
  "AUD"?: number;
  "EUR"?: number;
  "GBP"?: number;
  "id"?: number;
}

export class ExchangeRate implements ExchangeRateInterface {
  "timestamp": Date;
  "AUD": number;
  "EUR": number;
  "GBP": number;
  "id": number;
  constructor(data?: ExchangeRateInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ExchangeRate`.
   */
  public static getModelName() {
    return "ExchangeRate";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ExchangeRate for dynamic purposes.
  **/
  public static factory(data: ExchangeRateInterface): ExchangeRate{
    return new ExchangeRate(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'ExchangeRate',
      plural: 'ExchangeRates',
      path: 'ExchangeRates',
      idName: 'id',
      properties: {
        "timestamp": {
          name: 'timestamp',
          type: 'Date'
        },
        "AUD": {
          name: 'AUD',
          type: 'number'
        },
        "EUR": {
          name: 'EUR',
          type: 'number'
        },
        "GBP": {
          name: 'GBP',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
