# Organic Test

### Init with Docker

```js
npm i
docker compose up --build
```

### Init without Docker

```js
npm i
npm run start
```

- `docker compose up --build`
- `docker compose up --build --target test`
- `docker compose down`

### Docker

- `docker compose up --build`
- `docker compose down`

### Docker PostgreSQL

- run `psql -U postgres -h localhost postgres;`
