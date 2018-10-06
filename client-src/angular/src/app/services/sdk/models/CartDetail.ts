/* tslint:disable */
import {
  User,
  Item
} from '../index';

declare var Object: any;
export interface CartDetailInterface {
  "addedDate": Date;
  "size": number;
  "quantity": number;
  "id"?: number;
  "userId"?: number;
  "itemId"?: number;
  user?: User;
  item?: Item;
}

export class CartDetail implements CartDetailInterface {
  "addedDate": Date;
  "size": number;
  "quantity": number;
  "id": number;
  "userId": number;
  "itemId": number;
  user: User;
  item: Item;
  constructor(data?: CartDetailInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CartDetail`.
   */
  public static getModelName() {
    return "CartDetail";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CartDetail for dynamic purposes.
  **/
  public static factory(data: CartDetailInterface): CartDetail{
    return new CartDetail(data);
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
      name: 'CartDetail',
      plural: 'cartDetails',
      path: 'cartDetails',
      idName: 'id',
      properties: {
        "addedDate": {
          name: 'addedDate',
          type: 'Date'
        },
        "size": {
          name: 'size',
          type: 'number'
        },
        "quantity": {
          name: 'quantity',
          type: 'number'
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
