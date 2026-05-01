/* ============================================
   API Client – Wrapper quanh fetch()
   ============================================ */
const api = {
  async get(path) {
    const res = await fetch(`${API_BASE_URL}${path}`, { credentials: 'include' });
    if (!res.ok) throw await res.json().catch(() => ({ error: 'Network error' }));
    return res.json();
  },

  async post(path, body) {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  },

  async put(path, body) {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  },

  async patch(path, body) {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  },

  async delete(path) {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  },
};
