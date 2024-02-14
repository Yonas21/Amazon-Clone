# BookStore API

Simple book store api attempt with [Typescript](https://www.typescriptlang.org), [Express](https://expressjs.com), [TypeORM](https://typeorm.io) and [Postgres](https://www.postgresql.org).
Testing with [Jest](https://jestjs.io) & [Supertest](https://github.com/visionmedia/supertest).

# Prerequisites

-   Node
-   Typescript

# Project setup

```
npm install
```

# Rename .env.example to env

Change `NODE_ENV` to `prod` if you want to test building prod version locally.

```yaml
NODE_ENV=dev
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_INSTANCE=postgres
DB_SYNCHRONIZE=true
JWT_SECRET=secret
```

# Start dev server and seed database with initial data

```
npm run dev
```

# Lint code to detect issues

```
npm run lint
```

# Build code for production

Make sure your `NODE_ENV` is set to `prod`.

```
npm run build
```

# Login to receive jwt token for subsequent request

```bash
POST http://localhost:3000/api/auth/login
```

```json
{
	"username": "admin",
	"password": "admin"
}
```

### Use token from login repsone in the auth header for subsequent request

```
generated-token
```

# Create booking

```bash
POST http://localhost:3000/api/books
```

```json
{
	"title": "The Art of War",
	"writer": "SanZu",
	"coverImage": "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
	"price": 2,
	"tag": "Fiction"
}
```

# Get all bookings

```bash
GET http://localhost:3000/api/books
```

# Get single booking

```bash
GET http://localhost:3000/api/books/:id
```

# Update booking

```bash
PUT http://localhost:3000/api/books/:id
```

```json
{
	"title": "The Art of War",
	"writer": "SanZu",
	"coverImage": "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
	"price": 2,
	"tag": "Fiction"
}
```

# Delete booking

```bash
DELETE http://localhost:3000/api/books/:id
```

# Create Order

```bash
POST http://localhost:3000/api/order
```

```json
{
	"book_id": 1
}
```

# Get all Orders

```bash
GET http://localhost:3000/api/destinations
```

```json
[
	{
		"title": "The Art of War",
		"writer": "SanZu",
		"coverImage": "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
		"price": 2,
		"tag": "Fiction"
	}
]
```

# Get single order

```bash
GET http://localhost:3000/api/destinations/:id
```

```json
{
	"title": "The Art of War",
	"writer": "SanZu",
	"coverImage": "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
	"price": 2,
	"tag": "Fiction"
}
```

# Update destination

```bash
PUT http://localhost:3000/api/destinations/:id
```

```json
{
	"book_id": 1
}
```

# Delete destination

```bash
DELETE http://localhost:3000/api/destinations/:id
```

```json
{
	"book_id": 1
}
```
