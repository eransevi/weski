# Ski Trip Planner

## Overview of the solution
### Server
* The server is written in Express. It runs by default on PORT 5000.
* The server exposes one api `/api/v1/search/hotels` that receives the body in the same structure as the API provided in the exercise
* The server is also opening a websocket connection, listening to clients
#### Performance Consideration
* When receiving a search request, the server calls the external API 
asynchronously and concurrently both for each provider it has and for each group size from the number is received to the max size of 10
* On each response from the external API, the result is immediately sent to the client on the websocket channel
#### Extensibility Consideration
* The code supports several providers. 
* Each provider need to implement a specific interface.
* Each provider holds the implementation for fetching the results from it's dedicated API, allowing the provider to adapt the request and response between the interface types and specific provider types
* For the exercise only one provider is implemented and the request/response types are the same between the external API and our code
* A factory gives access to all available providers.

### Client
* The client is written in React. It uses MaterialUI for the basic component styles. 
* The main component is SearchMain which holds both the SearchBar and SearchResults components. 
* The SearchMain component registers the client on the websocket and waits for messages
* When a message is received it updates the list of results which will make sure the client see the results gradually as they are received from the server

## How to Run the code
Clone the repository and run the following commands from the root folder

* Server:
  * `cd server`
  * `npm install`
  * `npm start` (or `npm run dev` for development mode)

* Client:
  * `cd client`
  * `npm install`
  * `npm start`