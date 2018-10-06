/* tslint:disable */
import {
  Address,
  CartDetail,
  WishListDetail
} from '../index';

declare var Object: any;
export interface UserInterface {
  "fullname"?: string;
  "gender"?: number;
  "title"?: string;
  "contact"?: string;
  "sockSize"?: number;
  "accountType"?: string;
  "id"?: number;
  address?: Address[];
  cartDetail?: CartDetail[];
  wishListDetail?: WishListDetail[];
}

export class User implements UserInterface {
  "fullname": string;
  "gender": number;
  "title": string;
  "contact": string;
  "sockSize": number;
  "accountType": string;
  "id": number;
  address: Address[];
  cartDetail: CartDetail[];
  wishListDetail: WishListDetail[];
  constructor(data?: UserInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `User`.
   */
  public static getModelName() {
    return "User";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of User for dynamic purposes.
  **/
  public static factory(data: UserInterface): User{
    return new User(data);
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
      name: 'User',
      plural: 'users',
      path: 'users',
      idName: 'id',
      properties: {
        "fullname": {
          name: 'fullname',
          type: 'string'
        },
        "gender": {
          name: 'gender',
          type: 'number'
        },
        "title": {
          name: 'title',
          type: 'string'
        },
        "contact": {
          name: 'contact',
          type: 'string'
        },
        "sockSize": {
          name: 'sockSize',
          type: 'number'
        },
        "accountType": {
          name: 'accountType',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        address: {
          name: 'address',
          type: 'Address[]',
          model: 'Address',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        cartDetail: {
          name: 'cartDetail',
          type: 'CartDetail[]',
          model: 'CartDetail',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        wishListDetail: {
          name: 'wishListDetail',
          type: 'WishListDetail[]',
          model: 'WishListDetail',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
      }
    }
  }
}
