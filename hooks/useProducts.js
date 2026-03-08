// useProducts hook
// - Purpose: Encapsulates product list state and CRUD operations against the backend API.
// - Key outputs (returned object):
//    - products: array of product objects
//    - loading: boolean indicating fetch/delete operations in progress
//    - posting: boolean indicating create/update in progress
//    - fetchProducts(): loads products from API and updates `products`
//    - createProduct(body): creates a product then refreshes list
//    - updateProduct(id, body): updates a product then refreshes list
//    - deleteProduct(id): deletes a product then refreshes list
// - Notes: Delegates actual HTTP calls to `api/productApi.js` and keeps simple loading/posting flags.

import { useState } from 'react';
import productApi from '../api/productApi';

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);

  // fetchProducts: fetches product list and updates state
  // - sets loading flag while the request is in-flight
  // - on success sets `products` to the returned array (or empty array)
  async function fetchProducts() {
    setLoading(true);
    try {
      const data = await productApi.getProducts();
      setProducts(Array.isArray(data) ? data : []);
      return data;
    } finally {
      setLoading(false);
    }
  }

  // createProduct: POST body to API, then refresh the list
  // - sets posting flag while request is in-flight
  async function createProduct(body) {
    setPosting(true);
    try {
      const res = await productApi.createProduct(body);
      await fetchProducts();
      return res;
    } finally {
      setPosting(false);
    }
  }

  // updateProduct: PUT to API for given id, then refresh list
  // - sets posting flag while request is in-flight
  async function updateProduct(id, body) {
    setPosting(true);
    try {
      const res = await productApi.updateProduct(id, body);
      await fetchProducts();
      return res;
    } finally {
      setPosting(false);
    }
  }

  // deleteProduct: DELETE request for id, then refresh list
  // - uses loading flag while removing and refetching
  async function deleteProduct(id) {
    setLoading(true);
    try {
      await productApi.deleteProduct(id);
      await fetchProducts();
    } finally {
      setLoading(false);
    }
  }

  return {
    products,
    loading,
    posting,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
