# Notes about folder structure

└── CoinKeeperBackend/
    ├── node_modules/
    ├── src/
    │   ├── configs/ *keeps all the configs db name, username in `db.config.js`,number of records for each page in pagination*
    │   ├── controllers/ *controllers get the requests from routes and conver tot HTTP responses and use middlewares as required*
    │   ├── middlewares/ *middlewares :*
    │   ├── models/ *data models or schemas* 
    │   ├── routes/
    │   ├── services/ *all the business logic, i.e. run queries on db*
    │   └── utils/ *helper funtions, constants etc.* 
    ├── test/ *unit tests*
    ├── index.js
    ├── package.json
    └── README.md