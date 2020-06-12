import IDataModel from '@/models/IDataModel';
import ModelData from '@/types/models/ModelData';

export abstract class DataModel implements IDataModel {
  protected constructor(data: ModelData) {
    // console.log(data); // avoid ts errors
  }
}
