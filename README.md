# Notes about folder structure

```bash
└── CoinKeeperBackend
    ├── node_modules
    ├── src/
    │   ├── configs/            # keeps all the configs db name, username in `db.config.js`, number of records for each page in pagination
    │   ├── controllers/        # controllers get the requests from routes and convert to HTTP responses and use middlewares as required
    │   ├── middlewares/        # middlewares
    │   ├── models/             # data models or schemas
    │   ├── routes/             # routes folder that will have a single file for each logical set of routes. For example, there can be routes for one type of resource. It can be further broken down by versions like v1 or v2 to separate the route files by the version of the API.
    │   ├── services/           # all the business logic, i.e. run queries on db
    │   └── utils/              # helper functions, constants etc.
    ├── test/                   # unit tests
    ├── index.js
    ├── package.json
    └── README.md
```

## API requirements

- **GET category wise spends by month and year along with budget:** This is required for the rendering the chart and the category wise spends in the dashboard. Getting budget at the same time can reduce the api call overhead.
- **GET transactions based on date range:** This is required for rendering the recents view, I am planning to show maybe 10 days of transactions and provide a *date range picker* to the user for viewing anything else.
- **POST Login and Register**: I will expose 2 post functionalities, there will be need for middlewares.
- **OAuth Maybe?**: Need to look into this.
- **POST Add transaction**
- **POST Voice Autofill**: This will have to talk to the LLM to guess the amount category etc.
- **GET Analysis**: Basic for now, I don't want to spend hours developing the chatbot, so maybe just get insights based on past 3 months.
- **PATCH Edit transaction**
- **DELETE Delete transaction**
- **Configure CORS**