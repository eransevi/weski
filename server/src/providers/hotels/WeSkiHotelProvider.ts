import { HotelProvider, HotelsAPIQuery, HotelsQueryApiResponse } from "./types";

export class WeSkiHotelProvider implements HotelProvider {
  readonly providerId: string;
  readonly providerName: string;
  readonly providerApiUrl: string;

  constructor(providerId: string, providerName: string, providerApiUrl: string) {
    this.providerId = providerId;
    this.providerName = providerName;
    this.providerApiUrl = providerApiUrl;
  }

  async fetchResults(query: HotelsAPIQuery): Promise<HotelsQueryApiResponse> {
    // TODO: validate query
    try {
      const response = await fetch(this.providerApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      });

      if (!response.ok) {
        throw new Error(`Error fetching results: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error : any) {
      throw new Error(`Error fetching results: ${error.message}`);
    }
  }
}