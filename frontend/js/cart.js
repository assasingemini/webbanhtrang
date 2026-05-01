/* ============================================
   Cart – localStorage-based shopping cart
   ============================================ */
const Cart = {
  KEY: 'cart',

  getItems() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY) || '[]');
    } catch { return []; }
  },

  save(items) {
    localStorage.setItem(this.KEY, JSON.stringify(items));
    this.updateBadge();
  },

  addItem(product, quantity = 1) {
    const items = this.getItems();
    const idx = items.findIndex(i => i.id === product.id);
    if (idx > -1) {
      items[idx].quantity = Math.min(99, items[idx].quantity + quantity);
    } else {
      items.push({ ...product, quantity: Math.min(99, quantity) });
    }
    this.save(items);
  },

  removeItem(id) {
    const items = this.getItems().filter(i => i.id !== id);
    this.save(items);
  },

  updateQuantity(id, qty) {
    if (qty <= 0) { this.removeItem(id); return; }
    const items = this.getItems();
    const item = items.find(i => i.id === id);
    if (item) item.quantity = Math.min(99, qty);
    this.save(items);
  },

  clear() {
    this.save([]);
  },

  getTotalItems() {
    return this.getItems().reduce((sum, i) => sum + i.quantity, 0);
  },

  getTotalPrice() {
    return this.getItems().reduce((sum, i) => sum + i.price * i.quantity, 0);
  },

  updateBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    const count = this.getTotalItems();
    badges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'flex' : 'none';
    });
  },

  formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  }
};

document.addEventListener('DOMContentLoaded', () => Cart.updateBadge());
