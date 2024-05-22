import { WeSkiHotelProvider } from "./WeSkiHotelProvider";
import { HotelProvider } from "./types";


const defaultProviders: { [key: string]: HotelProvider } = {
  'we_ski': new WeSkiHotelProvider('we_ski', 'We Ski', 'https://gya7b1xubh.execute-api.eu-west-2.amazonaws.com/default/HotelsSimulator')
};

let instance: HotelsProviderFactory;

class HotelsProviderFactory {
  private providers: Record<string, HotelProvider> = {};

  constructor() {
    if (instance) {
      throw new Error("New Factory instance can't be created");
    }
    instance = this;
    // Actual providers should be loaded from a configuration file or a database for example
    instance.providers = defaultProviders;
  }

  getProviders(): Record<string, HotelProvider> {
    return this.providers;
  }
}

const hotelsProviderFactory: HotelsProviderFactory =
  new HotelsProviderFactory();

export default hotelsProviderFactory;