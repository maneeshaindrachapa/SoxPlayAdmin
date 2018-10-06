/* tslint:disable */

declare var Object: any;
export interface StoresInterface {
  "name": string;
  "address": string;
  "lng": number;
  "lat": number;
  "id"?: number;
}

export class Stores implements StoresInterface {
  "name": string;
  "address": string;
  "lng": number;
  "lat": number;
  "id": number;
  constructor(data?: StoresInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Stores`.
   */
  public static getModelName() {
    return "Stores";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Stores for dynamic purposes.
  **/
  public static factory(data: StoresInterface): Stores{
    return new Stores(data);
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
      name: 'Stores',
      plural: 'stores',
      path: 'stores',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "address": {
          name: 'address',
          type: 'string'
        },
        "lng": {
          name: 'lng',
          type: 'number'
        },
        "lat": {
          name: 'lat',
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
