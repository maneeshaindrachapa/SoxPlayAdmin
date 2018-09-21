/* tslint:disable */
import {
  Order,
  Item
} from '../index';

declare var Object: any;
export interface OrderDetailInterface {
  "size": number;
  "quantity": number;
  "fullpack"?: number;
  "pair"?: boolean;
  "id"?: number;
  "orderId"?: number;
  "itemId"?: number;
  order?: Order;
  item?: Item;
}

export class OrderDetail implements OrderDetailInterface {
  "size": number;
  "quantity": number;
  "fullpack": number;
  "pair": boolean;
  "id": number;
  "orderId": number;
  "itemId": number;
  order: Order;
  item: Item;
  constructor(data?: OrderDetailInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `OrderDetail`.
   */
  public static getModelName() {
    return "OrderDetail";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of OrderDetail for dynamic purposes.
  **/
  public static factory(data: OrderDetailInterface): OrderDetail{
    return new OrderDetail(data);
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
      name: 'OrderDetail',
      plural: 'orderDetails',
      path: 'orderDetails',
      idName: 'id',
      properties: {
        "size": {
          name: 'size',
          type: 'number'
        },
        "quantity": {
          name: 'quantity',
          type: 'number'
        },
        "fullpack": {
          name: 'fullpack',
          type: 'number'
        },
        "pair": {
          name: 'pair',
          type: 'boolean'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "orderId": {
          name: 'orderId',
          type: 'number'
        },
        "itemId": {
          name: 'itemId',
          type: 'number'
        },
      },
      relations: {
        order: {
          name: 'order',
          type: 'Order',
          model: 'Order',
          relationType: 'belongsTo',
                  keyFrom: 'orderId',
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
