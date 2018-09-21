/* tslint:disable */
import {
  User
} from '../index';

declare var Object: any;
export interface AddressInterface {
  "type": number;
  "firstName": string;
  "title": string;
  "lastName"?: string;
  "addressLine1": string;
  "addressLine2"?: string;
  "city": string;
  "state"?: string;
  "zipCode"?: number;
  "country": string;
  "default"?: boolean;
  "id"?: number;
  "userId"?: number;
  user?: User;
}

export class Address implements AddressInterface {
  "type": number;
  "firstName": string;
  "title": string;
  "lastName": string;
  "addressLine1": string;
  "addressLine2": string;
  "city": string;
  "state": string;
  "zipCode": number;
  "country": string;
  "default": boolean;
  "id": number;
  "userId": number;
  user: User;
  constructor(data?: AddressInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Address`.
   */
  public static getModelName() {
    return "Address";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Address for dynamic purposes.
  **/
  public static factory(data: AddressInterface): Address{
    return new Address(data);
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
      name: 'Address',
      plural: 'addresses',
      path: 'addresses',
      idName: 'id',
      properties: {
        "type": {
          name: 'type',
          type: 'number',
          default: 0
        },
        "firstName": {
          name: 'firstName',
          type: 'string'
        },
        "title": {
          name: 'title',
          type: 'string'
        },
        "lastName": {
          name: 'lastName',
          type: 'string'
        },
        "addressLine1": {
          name: 'addressLine1',
          type: 'string'
        },
        "addressLine2": {
          name: 'addressLine2',
          type: 'string'
        },
        "city": {
          name: 'city',
          type: 'string'
        },
        "state": {
          name: 'state',
          type: 'string'
        },
        "zipCode": {
          name: 'zipCode',
          type: 'number'
        },
        "country": {
          name: 'country',
          type: 'string'
        },
        "default": {
          name: 'default',
          type: 'boolean',
          default: false
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
      }
    }
  }
}
