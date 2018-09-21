/* tslint:disable */
import {
  Item
} from '../index';

declare var Object: any;
export interface ThemeInterface {
  "name": string;
  "expired": boolean;
  "id"?: number;
  item?: Item[];
}

export class Theme implements ThemeInterface {
  "name": string;
  "expired": boolean;
  "id": number;
  item: Item[];
  constructor(data?: ThemeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Theme`.
   */
  public static getModelName() {
    return "Theme";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Theme for dynamic purposes.
  **/
  public static factory(data: ThemeInterface): Theme{
    return new Theme(data);
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
      name: 'Theme',
      plural: 'themes',
      path: 'themes',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "expired": {
          name: 'expired',
          type: 'boolean',
          default: false
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        item: {
          name: 'item',
          type: 'Item[]',
          model: 'Item',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'themeId'
        },
      }
    }
  }
}
