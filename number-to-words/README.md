## How to run it

There are two main folders `client` and `sever` to run make the app run you will need to:

From the root folder:

**For the server side:**

```
cd ./server
npm install
npm run dev

For running the tests:
npm run test
```

**For the client side:**

```
For running the app

cd ./client
yarn install
yarn start

For running the tests:
yarn run test
```

## Process

- Setting up the folder structure: client and server folder each with own package.json. Ideally on second stage having one package.json to run both apps concurrently

### Thinking about how to structure BE logic:

**Setting up the backend:**

- [x] creating the endpoint controller
- [x] creating the logic for the endpoint
- [x] adding a filter logic (using a dictionary)
- [x] handles wrong request
- [x] creating tests

### Thinking about how to structure FE structure and logic:

**Setting up the frontend:**

- [x] creating main components
- [x] setting up the stores
- [x] adding delete logic
- [x] adding some simple design
- [x] creating tests: for the redux part of the code
