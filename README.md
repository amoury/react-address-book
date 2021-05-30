## The Address Book

The app is deployed on and can be viewed at `https://nu-address-book.netlify.app/`

## Run the App locally (Development Server)

To run the app locally - once you clone the app, `cd` into the app directory and run `npm i`.

Before running the app, you will need to copy `.env.local` file which includes the `TOKEN` for loading the Map view. This file will be attached in the email. Just copy that file at the root of the project directory.

To start the app, run `npm run start` and you should be able to access the app on `localhost:3000`.

## Run the App locally with Kubernetes

> Requirements - You would need Docker Desktop installed with Kubernetes engine enabled, to run the app in the cluster.

To deploy and run the production app from a local kubernetes cluster - `cd` into the app directory and run `kubectl apply -f deployment.yaml`.

Then visit `localhost:31000` to view the app.

To stop the deployment and service, type `kubectl delete -f deployment.yaml`. This will bring down all the running pods and service created for this app.

> Note: I have not used ingress controllers since we only have a single service for this application. So the app is exposed using NodePort service type.

## Your Overall approach

On the first look the application requirements are very simple. API is pretty straightforward. But there were 2 things I noticed -

1. API doesn't provide search endpoint,
2. There is no endpoint to get user details by id or anything.

So, if I wanted to add search it had to be some implementation on the client side and secondly when the route changed that data should be passed to the new location as a state as opposed to querying the data by `userId` for example.

React router gives perfect solution out of the box for passing the state to the next location.

For these reasons, I decided to go with create react app, react router combination. It also gives most of the webpack config with Babel, ESLint and react testing library setup out of the box.

Initially, I planned to use the pagination feature provided by the randomuser API. But it added limitation that search / sort could only be implemented on the available data per page. This resulted in search functionality to behave in unexpected manner. So the decision was made to fetch 500 records, and then handle pagination on the client side.

To avoid spending lot of time in styling, I decided to go with Semantic React framework since it takes declarative approach for lot of the components out of the box. For minor styling overrides I decided to use `module css`, since it prevents CSS class name clashes and comes by default with CRA.

## Architecture

I have created `UserContext` that acts as a central place to communicate data between the data layer and the components. `UserContext` is a location where all the data manipulations happen like sort, search and pagination. As a data layer, I have used `React Query` which works on the principle of Stale-while-Revalidate (SWR). This improves the app's performance by caching the data.

## Features

- List View - Since this was a requirement.
- Map View - This was exciting since I have been wanting to work with Mapbox and since this api provides user coordinates, I felt this was a good addition.
- Search - A simple client side implementation to narrow down the records.
- Sort - Added sorting based on the column.
- Pagination - To paginate between the records.

Given more time, I would have liked to add `Filter` and change `Limit` functionality. Although it is not very time consuming, I wouldn't have enough time to add tests for these. Also I definitely see opportunities to improve the UI, which given more time, I would spend imrpoving that.

Given more time I would have added more tests to make the project more robust. Although for now I have added `ErrorBoundary` which will help recover app gracefully.
