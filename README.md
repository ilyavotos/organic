# Organic Test

https://docs.google.com/document/d/1qA9ecjV-N4tCkuxGoF7DgG0I_sVpEO0-JkdnuAiSVxk/edit?tab=t.0

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
