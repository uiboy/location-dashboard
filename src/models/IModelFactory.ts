import IDataModel from '@/models/IDataModel';

export abstract class IModelFactory<T extends IDataModel> {
  abstract make(data: unknown): T;
}
