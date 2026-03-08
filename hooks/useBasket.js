// useBasket hook
// - Purpose: Encapsulates basket state and operations for a given user.
// - Parameters: userId (string)
// - Key outputs (returned object):
//    - basket: object containing an `items` array of basket entries
//    - loading: boolean indicating a fetch/mutate operation is in progress
//    - total: computed total price across all basket items
//    - loadBasket(): fetches basket from API and updates `basket`
//    - changeQuantity(item, removeAll): decrements item qty by 1, or removes entirely if removeAll is true
//    - incrementQuantity(item): increases item qty by 1
// - Notes: Delegates HTTP calls to `api/basketApi.js`. All functions throw on error — callers should catch.

import { useState } from 'react';
import basketApi from '../api/basketApi';

export default function useBasket(userId) {
  const [basket, setBasket] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  // loadBasket: fetches the basket for userId and updates state
  // - sets loading flag while the request is in-flight
  async function loadBasket() {
    setLoading(true);
    try {
      const data = await basketApi.getBasket(userId);
      setBasket(data);
    } finally {
      setLoading(false);
    }
  }

  // getProductId: extract productId from a basket item regardless of whether
  // the product field is a raw id string (not populated) or a full object (populated).
  // Returns null if the product has been deleted or is missing.
  function getProductId(item) {
    const raw = item?.product;
    if (!raw) return null;
    if (typeof raw === 'string') return raw;
    return raw._id || raw.id || null;
  }

  // changeQuantity: decrement item qty by 1, or remove entirely when removeAll is true.
  // Throws if productId cannot be determined (e.g. product was deleted).
  async function changeQuantity(item, removeAll = false) {
    const productId = getProductId(item);
    if (!productId) throw new Error('Item refers to a deleted product. Please refresh to remove stale items.');
    setLoading(true);
    try {
      await basketApi.removeFromBasket({ userId, productId, removeAll });
      await loadBasket();
    } finally {
      setLoading(false);
    }
  }

  // incrementQuantity: increase item qty by 1.
  // Throws if productId cannot be determined.
  async function incrementQuantity(item) {
    const productId = getProductId(item);
    if (!productId) throw new Error('Item refers to a deleted product. Please refresh to remove stale items.');
    setLoading(true);
    try {
      await basketApi.addToBasket({ userId, productId, quantity: 1 });
      await loadBasket();
    } finally {
      setLoading(false);
    }
  }

  // total: sum of (price × quantity) for all items in the basket
  const total = (basket.items || []).reduce((s, it) => s + (it.product?.price ?? 0) * it.quantity, 0);

  return {
    basket,
    loading,
    total,
    loadBasket,
    changeQuantity,
    incrementQuantity,
  };
}
