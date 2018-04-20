import { Temperature } from './temperature';
export class Station {
    id = 0;
    name = '';  // topic
    lastTemperature: Temperature;
    lastUpdate = new Date();
}
