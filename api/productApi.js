// productApi
// - Purpose: Centralized product-related HTTP calls to the backend REST API.
// - Exports:
//    - getProducts(): GET /products -> returns array of products
//    - createProduct(body): POST /products -> creates product
//    - updateProduct(id, body): PUT /products/:id -> updates product
//    - deleteProduct(id): DELETE /products/:id -> deletes product
// - Notes: All functions throw on non-OK responses. BASE_URL should point to backend server.

import { BASE_URL as CONFIG_BASE_URL } from '../config.example';
const BASE_URL = CONFIG_BASE_URL || 'https://your-backend.example';

// Fetch the list of products from the backend.
// Throws an Error if the response is not ok.
async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`, {
    headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
  });
  if (!res.ok) throw new Error(`Server responded ${res.status}`);
  return res.json();
}

// Create a product by POSTing the provided body (expects JSON serializable body).
// Returns parsed JSON response when available; throws on non-OK responses.
async function createProduct(body) {
  const res = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Server: ${res.status} ${text}`);
  }
  try {
    return await res.json();
  } catch (err) {
    return null;
  }
}

// Update an existing product by id using PUT. Body should contain the updated fields.
// Throws on non-OK responses and returns parsed JSON when available.
async function updateProduct(id, body) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Server: ${res.status} ${text}`);
  }
  try {
    return await res.json();
  } catch (err) {
    return null;
  }
}

// Delete a product by id. Returns true on success, throws on failure.
async function deleteProduct(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE',
    headers: { 'ngrok-skip-browser-warning': 'true' },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Server: ${res.status} ${text}`);
  }
  return true;
}

export default {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};