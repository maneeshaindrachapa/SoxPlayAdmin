/* tslint:disable */
import {
  Theme
} from '../index';

declare var Object: any;
export interface ItemInterface {
  "name": string;
  "price": number;
  "description": any;
  "hits"?: number;
  "onSale": boolean;
  "color"?: string;
  "weight"?: number;
  "salePrice": number;
  "id"?: number;
  "themeId"?: number;
  theme?: Theme;
}

export class Item implements ItemInterface {
  "name": string;
  "price": number;
  "description": any;
  "hits": number;
  "onSale": boolean;
  "color": string;
  "weight": number;
  "salePrice": number;
  "id": number;
  "themeId": number;
  theme: Theme;
  constructor(data?: ItemInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Item`.
   */
  public static getModelName() {
    return "Item";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Item for dynamic purposes.
  **/
  public static factory(data: ItemInterface): Item{
    return new Item(data);
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
      name: 'Item',
      plural: 'items',
      path: 'items',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "price": {
          name: 'price',
          type: 'number'
        },
        "description": {
          name: 'description',
          type: 'any'
        },
        "hits": {
          name: 'hits',
          type: 'number',
          default: 0
        },
        "onSale": {
          name: 'onSale',
          type: 'boolean',
          default: false
        },
        "color": {
          name: 'color',
          type: 'string'
        },
        "weight": {
          name: 'weight',
          type: 'number'
        },
        "salePrice": {
          name: 'salePrice',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "themeId": {
          name: 'themeId',
          type: 'number'
        },
      },
      relations: {
        theme: {
          name: 'theme',
          type: 'Theme',
          model: 'Theme',
          relationType: 'belongsTo',
                  keyFrom: 'themeId',
          keyTo: 'id'
        },
      }
    }
  }
}
