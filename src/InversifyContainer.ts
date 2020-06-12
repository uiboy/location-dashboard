import 'reflect-metadata';
import { Container } from 'inversify';
import IHttpService from '@/services/http/IHttpService';
import HttpService from '@/services/http/HttpService';
import { TYPES } from '@/types/Inversify';
import IWeatherService from '@/services/weather/IWeatherService';
import WeatherService from '@/services/weather/WeatherService';
import IEnvironmentService from '@/services/environment/IEnvironmentService';
import { EnvironmentService } from '@/services/environment/EnvironmentService';

const appContainer = new Container();

appContainer
  .bind<IHttpService>(TYPES.HttpService)
  .to(HttpService)
  .inSingletonScope();

appContainer
  .bind<IWeatherService>(TYPES.WeatherService)
  .to(WeatherService)
  .inSingletonScope();

appContainer
  .bind<IEnvironmentService>(TYPES.EnvironmentService)
  .to(EnvironmentService)
  .inSingletonScope();

export { appContainer };
