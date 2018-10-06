/* tslint:disable */
import {
  User,
  Item
} from '../index';

declare var Object: any;
export interface WishListDetailInterface {
  "addedDate": Date;
  "id"?: number;
  "userId"?: number;
  "itemId"?: number;
  user?: User;
  item?: Item;
}

export class WishListDetail implements WishListDetailInterface {
  "addedDate": Date;
  "id": number;
  "userId": number;
  "itemId": number;
  user: User;
  item: Item;
  constructor(data?: WishListDetailInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `WishListDetail`.
   */
  public static getModelName() {
    return "WishListDetail";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of WishListDetail for dynamic purposes.
  **/
  public static factory(data: WishListDetailInterface): WishListDetail{
    return new WishListDetail(data);
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
      name: 'WishListDetail',
      plural: 'wishListDetails',
      path: 'wishListDetails',
      idName: 'id',
      properties: {
        "addedDate": {
          name: 'addedDate',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "userId": {
          name: 'userId',
          type: 'number'
        },
        "itemId": {
          name: 'itemId',
          type: 'number'
        },
      },
      relations: {
        user: {
          name: 'user',
          type: 'User',
          model: 'User',
          relationType: 'belongsTo',
                  keyFrom: 'userId',
          keyTo: 'id'
        },
        item: {
          name: 'item',
          type: 'Item',
          model: 'Item',
          relationType: 'belongsTo',
                  keyFrom: 'itemId',
          keyTo: 'id'
        },
      }
    }
  }
}
