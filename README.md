# Blockchain transaction tracker
## Description
This project is written using React v16.13.1, Typescript and Redux.

There are two main components: ControlPanel and TransactionTable. ControlPanel
is responsible for socket operations and saving data about transactions to store.
TransactionTable reads the data from the store and shows it to the user.

The project is accessible on https://yuloskov.github.io/blockchain-transactions/
## Issues and caveats
There could be a problem with performance of the table, since the transactions
update pretty fast. It could be fixed using [Virtual Table](http://localhost:3000/).

Another issue is that there is no single "from address" and "to address" in 
the blockchain transaction. There are multiple inputs and multiple outputs with 
no direct mapping. I decided to show all of them in each row. 
## How to run
```
docker build -t react-app .
docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3000:3000 -e CHOKIDAR_USEPOLLING=true -d react-app
```
Then the app will run on http://localhost:3000/blockchain-transactions