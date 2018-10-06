/* tslint:disable */

declare var Object: any;
export interface CombinationDetailsInterface {
  "id_1": number;
  "id_2": number;
  "fb_id"?: string;
  "insta_id"?: string;
  "id"?: number;
}

export class CombinationDetails implements CombinationDetailsInterface {
  "id_1": number;
  "id_2": number;
  "fb_id": string;
  "insta_id": string;
  "id": number;
  constructor(data?: CombinationDetailsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CombinationDetails`.
   */
  public static getModelName() {
    return "CombinationDetails";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CombinationDetails for dynamic purposes.
  **/
  public static factory(data: CombinationDetailsInterface): CombinationDetails{
    return new CombinationDetails(data);
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
      name: 'CombinationDetails',
      plural: 'combinationDetails',
      path: 'combinationDetails',
      idName: 'id',
      properties: {
        "id_1": {
          name: 'id_1',
          type: 'number'
        },
        "id_2": {
          name: 'id_2',
          type: 'number'
        },
        "fb_id": {
          name: 'fb_id',
          type: 'string'
        },
        "insta_id": {
          name: 'insta_id',
          type: 'string'
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
