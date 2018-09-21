/* tslint:disable */
import {
  User,
  OrderDetail
} from '../index';

declare var Object: any;
export interface OrderInterface {
  "addedDate": Date;
  "shippingCost": number;
  "totalCost": number;
  "finalCost": number;
  "trackingId"?: string;
  "status"?: string;
  "coupon"?: number;
  "additionalNote"?: string;
  "raw_payment_info"?: string;
  "id"?: number;
  "userId"?: number;
  user?: User;
  orderDetail?: OrderDetail[];
}

export class Order implements OrderInterface {
  "addedDate": Date;
  "shippingCost": number;
  "totalCost": number;
  "finalCost": number;
  "trackingId": string;
  "status": string;
  "coupon": number;
  "additionalNote": string;
  "raw_payment_info": string;
  "id": number;
  "userId": number;
  user: User;
  orderDetail: OrderDetail[];
  constructor(data?: OrderInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Order`.
   */
  public static getModelName() {
    return "Order";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Order for dynamic purposes.
  **/
  public static factory(data: OrderInterface): Order{
    return new Order(data);
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
      name: 'Order',
      plural: 'orders',
      path: 'orders',
      idName: 'id',
      properties: {
        "addedDate": {
          name: 'addedDate',
          type: 'Date'
        },
        "shippingCost": {
          name: 'shippingCost',
          type: 'number'
        },
        "totalCost": {
          name: 'totalCost',
          type: 'number'
        },
        "finalCost": {
          name: 'finalCost',
          type: 'number'
        },
        "trackingId": {
          name: 'trackingId',
          type: 'string'
        },
        "status": {
          name: 'status',
          type: 'string'
        },
        "coupon": {
          name: 'coupon',
          type: 'number'
        },
        "additionalNote": {
          name: 'additionalNote',
          type: 'string'
        },
        "raw_payment_info": {
          name: 'raw_payment_info',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "userId": {
          name: 'userId',
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
        orderDetail: {
          name: 'orderDetail',
          type: 'OrderDetail[]',
          model: 'OrderDetail',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'orderId'
        },
      }
    }
  }
}
