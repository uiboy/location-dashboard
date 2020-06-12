import IEnvironmentService from '@/services/environment/IEnvironmentService';
import { injectable } from 'inversify';

@injectable()
export class EnvironmentService implements IEnvironmentService {
  get apiUrl() {
    return process.env.VUE_APP_WEATHER_API_BASE_URL as string;
  }
  get weatherApiKey() {
    return process.env.VUE_APP_WEATHER_API_KEY as string;
  }
}
