/* tslint:disable */

declare var Object: any;
export interface AdminUserInterface {
  "firstName": string;
  "realm"?: string;
  "username"?: string;
  "email": string;
  "emailVerified"?: boolean;
  "id"?: number;
  "password"?: string;
  accessTokens?: any[];
  identities?: any[];
  credentials?: any[];
}

export class AdminUser implements AdminUserInterface {
  "firstName": string;
  "realm": string;
  "username": string;
  "email": string;
  "emailVerified": boolean;
  "id": number;
  "password": string;
  accessTokens: any[];
  identities: any[];
  credentials: any[];
  constructor(data?: AdminUserInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AdminUser`.
   */
  public static getModelName() {
    return "AdminUser";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AdminUser for dynamic purposes.
  **/
  public static factory(data: AdminUserInterface): AdminUser{
    return new AdminUser(data);
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
      name: 'AdminUser',
      plural: 'admin-users',
      path: 'admin-users',
      idName: 'id',
      properties: {
        "firstName": {
          name: 'firstName',
          type: 'string'
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        identities: {
          name: 'identities',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        credentials: {
          name: 'credentials',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
      }
    }
  }
}
