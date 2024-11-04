# API Documentation

## Overview

This API provides functionality for user authentication, product management, and order checkout. Below are details on how to interact with each endpoint.

## Base URL

All endpoints below assume the base URL:

```
http://localhost:5001/api/v1
```

---

## Authentication

### Login

**Endpoint:** `POST /auth/login`  
**Description:** Logs in a user.

- **URL:** `/auth/login`
- **Request Body:**

  | Field    | Type   | Description     |
  | -------- | ------ | --------------- |
  | username | string | User's username |
  | password | string | User's password |

- **Example:**

  ```json
  {
    "username": "user1",
    "password": "password123"
  }
  ```

### Signup

**Endpoint:** `POST /auth/signup`  
**Description:** Registers a new user.

- **URL:** `/auth/signup`
- **Request Body:**

  | Field    | Type   | Description      |
  | -------- | ------ | ---------------- |
  | username | string | Desired username |
  | password | string | Desired password |

- **Example:**

  ```json
  {
    "username": "newuser",
    "password": "newpassword123"
  }
  ```

---

## Products

### Get Products

**Endpoint:** `GET /products`  
**Description:** Retrieves a list of all available products.

- **URL:** `/products`

### Get Single Product

**Endpoint:** `GET /products/:id`  
**Description:** Retrieves details of a specific product by its ID.

- **URL:** `/products/:id`
- **Path Parameter:**

  | Field | Type   | Description       |
  | ----- | ------ | ----------------- |
  | id    | string | ID of the product |

### Add Product

**Endpoint:** `POST /products`  
**Description:** Adds a new product to the collection.

- **URL:** `/products`
- **Request Body:**

  | Field       | Type   | Description                |
  | ----------- | ------ | -------------------------- |
  | name        | string | Name of the product        |
  | price       | number | Price of the product       |
  | amount      | number | Quantity available         |
  | category    | string | Product category           |
  | description | string | Detailed description       |
  | image       | string | Image URL for the product  |
  | sub_images  | array  | Sub Images url for product |

- **Example:**

  ```json
  {
    "name": "Sample Product",
    "price": 19.99,
    "amount": 50,
    "category": "Electronics",
    "description": "A high-quality electronic product",
    "image": "http://example.com/image.jpg",
    "sub_images": [
      "http://example.com/image.jpg",
      "http://example.com/image.jpg"
    ]
  }
  ```

### Update Product

**Endpoint:** `PATCH /products/:id`  
**Description:** Updates an existing product.

- **URL:** `/products/:id`
- **Path Parameter:**

  | Field | Type   | Description       |
  | ----- | ------ | ----------------- |
  | id    | string | ID of the product |

- **Optional Request Body:**

  | Field       | Type   | Description                |
  | ----------- | ------ | -------------------------- |
  | name        | string | Name of the product        |
  | price       | number | Price of the product       |
  | amount      | number | Quantity available         |
  | category    | string | Product category           |
  | description | string | Detailed description       |
  | image       | string | Image URL for the product  |
  | sub_images  | array  | Sub Images url for product |

- **Example:**

  ```json
  {
    "name": "Sample Product",
    "price": 19.99
  }
  ```

### Delete Product

**Endpoint:** `DELETE /products/:id`  
**Description:** Deletes a product by its ID.

- **URL:** `/products/:id`
- **Path Parameter:**

  | Field | Type   | Description       |
  | ----- | ------ | ----------------- |
  | id    | string | ID of the product |

---

## Checkout

### Checkout

**Endpoint:** `POST /products/checkout`  
**Description:** Simulates the checkout process for selected items.

- **URL:** `/products/checkout`
- **Request Body:**

  | Field  | Type   | Description          |
  | ------ | ------ | -------------------- |
  | items  | array  | List of item objects |
  | userId | string | ID of the user       |

- **Items Array Object:**

  | Field  | Type   | Description             |
  | ------ | ------ | ----------------------- |
  | id     | string | ID of the product       |
  | amount | number | Quantity of the product |

- **Example:**

  ```json
  {
    "items": [
      { "id": "product1", "amount": 2 },
      { "id": "product2", "amount": 1 }
    ],
    "userId": "user123"
  }
  ```

### Verify Token

**Endpoint:** `POST /auth/verify`  
**Description:** Verifies the provided refresh token.

- **URL:** `/auth/verify`
- **Request Body:**

  | Field | Type   | Description             |
  | ----- | ------ | ----------------------- |
  | token | string | Refresh token to verify |

- **Example:**

  ```json
  {
    "token": "your_refresh_token"
  }
  ```

### Refresh Token

**Endpoint:** `POST /auth/refresh`  
**Description:** Verifies the provided refresh token.

- **URL:** `/auth/refresh`
- **Request Body:**

  | Field | Type   | Description             |
  | ----- | ------ | ----------------------- |
  | token | string | Refresh token to verify |

- **Example:**

  ```json
  {
    "token": "your_refresh_token"
  }
  ```
