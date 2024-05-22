import { WebSocketServer } from 'ws';
import { Accommodation, HotelsAPIQuery } from '../providers/hotels/types';
import hotelsProviderFactory from '../providers/hotels/HotelsProvidersFactory';
import { group } from 'console';


class HotelsService {
  private hotelsProviders: Record<string, any> = {};
  private MAX_GROUP_SIZE: number = 10;

  constructor() {
    this.hotelsProviders = hotelsProviderFactory.getProviders();
  }
  async fetchHotels(query: HotelsAPIQuery, wss: WebSocketServer) {
    // Fetch results from all providers
    console.log(`Fetching hotels from providers: ${Object.keys(this.hotelsProviders)}`);
    let groupSize : number = parseInt(query.group_size);
    while (groupSize <= this.MAX_GROUP_SIZE) {
      query.group_size = groupSize.toString();
      await Promise.all( Object.values(this.hotelsProviders).map(async (provider) => {
          try {
            console.log(`Fetching results from provider ${provider.providerId}`);
            var results = await provider.fetchResults(query);
            // Broadcast results via WebSocket
            // TODO - need to send result only to the client who requested it
            console.log(`wss.clients.size: ${wss.clients.size}`)
            wss.clients.forEach(client => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(results));
              }
            });
          }
          catch (error: any) {
            console.error(`Error fetching results from provider ${provider.providerId}: ${error.message}`);
          }
        }
        ));
      groupSize++;
    }
  }
}

export default HotelsService;
