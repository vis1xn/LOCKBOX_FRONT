// basketApi
// - Purpose: Encapsulate basket-related HTTP calls to backend.
// - Exports:
//    - getBasket(userId)
//    - addToBasket({ userId, productId, quantity })
//    - removeFromBasket({ userId, productId, removeAll })

import { BASE_URL as CONFIG_BASE_URL } from '../config.example';
const BASE_URL = CONFIG_BASE_URL || 'https://your-backend.example';

async function getBasket(userId) {
  const res = await fetch(`${BASE_URL}/basket/${encodeURIComponent(userId)}`, {
    headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' }
  });
  if (!res.ok) throw new Error(`Server responded ${res.status}`);
  return res.json();
}

async function addToBasket(body) {
  const res = await fetch(`${BASE_URL}/basket/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Server: ${res.status} ${text}`);
  }
  try { return await res.json(); } catch { return null; }
}

async function removeFromBasket(body) {
  const res = await fetch(`${BASE_URL}/basket/remove`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Server: ${res.status} ${text}`);
  }
  try { return await res.json(); } catch { return null; }
}

export default { 
    getBasket, 
    addToBasket, 
    removeFromBasket 
};
