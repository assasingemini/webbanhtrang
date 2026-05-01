/* ============================================
   Shared Components – Header, Footer, Cart Drawer, Floating Contact
   Injected into every page via DOM
   ============================================ */

let _siteConfig = null;

async function getSiteConfig() {
  if (_siteConfig) return _siteConfig;
  try {
    _siteConfig = await api.get('/api/landing-page');
  } catch {
    _siteConfig = {};
  }
  return _siteConfig;
}

/* ---------- Header ---------- */
function renderHeader() {
  const nav = document.getElementById('header');
  if (!nav) return;

  nav.innerHTML = `
    <nav class="fixed top-0 left-0 right-0 z-50 shadow-md" style="background:#A60817">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="flex items-center justify-between h-16">
          <a href="index.html" class="flex items-center gap-2">
            <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style="background:#FFB200">
              <i data-lucide="flame" class="w-5 h-5" style="color:#A60817"></i>
            </div>
            <div class="leading-tight">
              <div class="text-white font-bold text-sm" style="font-family:var(--font-heading)">Bánh Tráng Trộn</div>
              <div class="text-xs" style="color:#FFB200">Ngon Cần Thơ</div>
            </div>
          </a>

          <div class="hidden md:flex items-center gap-1">
            <a href="index.html" class="px-4 py-2 rounded-full text-sm font-medium text-white hover:bg-white/10 transition-all">Trang Chủ</a>
            <a href="menu.html" class="px-4 py-2 rounded-full text-sm font-medium text-white hover:bg-white/10 transition-all">Thực Đơn</a>
            <a href="tin-tuc.html" class="px-4 py-2 rounded-full text-sm font-medium text-white hover:bg-white/10 transition-all">Tin Tức</a>
            <a href="lien-he.html" class="px-4 py-2 rounded-full text-sm font-medium text-white hover:bg-white/10 transition-all">Liên Hệ</a>
            <button onclick="openCart()" class="relative ml-2 p-2 rounded-full text-white hover:bg-white/10 transition-all" aria-label="Giỏ hàng">
              <i data-lucide="shopping-cart" class="w-5 h-5"></i>
              <span class="cart-badge absolute top-0 right-0 bg-[#FFB200] text-[#A60817] text-[10px] font-bold w-5 h-5 rounded-full items-center justify-center border-2 border-[#A60817]" style="display:none"></span>
            </button>
            <a href="tel:0123456789" class="ml-4 px-4 py-2 rounded-full text-sm font-bold transition-all" style="background:#FFB200;color:#A60817">Gọi Đặt Hàng</a>
          </div>

          <div class="flex items-center gap-2 md:hidden">
            <button onclick="openCart()" class="relative p-2 rounded-full text-white hover:bg-white/10 transition-all" aria-label="Giỏ hàng">
              <i data-lucide="shopping-cart" class="w-5 h-5"></i>
              <span class="cart-badge absolute top-0 right-0 bg-[#FFB200] text-[#A60817] text-[10px] font-bold w-4 h-4 rounded-full items-center justify-center border border-[#A60817]" style="display:none"></span>
            </button>
            <button class="text-white p-1" onclick="toggleMobileMenu()" aria-label="Mở menu" id="mobile-menu-btn">
              <i data-lucide="menu" class="w-6 h-6"></i>
            </button>
          </div>
        </div>
      </div>

      <div id="mobile-menu" class="md:hidden hidden" style="background:#8A2F2C">
        <div class="px-4 pt-2 pb-4 flex flex-col gap-1">
          <a href="index.html" class="block px-4 py-2 rounded-xl text-sm font-medium text-white hover:bg-white/10 transition-all">Trang Chủ</a>
          <a href="menu.html" class="block px-4 py-2 rounded-xl text-sm font-medium text-white hover:bg-white/10 transition-all">Thực Đơn</a>
          <a href="tin-tuc.html" class="block px-4 py-2 rounded-xl text-sm font-medium text-white hover:bg-white/10 transition-all">Tin Tức</a>
          <a href="lien-he.html" class="block px-4 py-2 rounded-xl text-sm font-medium text-white hover:bg-white/10 transition-all">Liên Hệ</a>
          <a href="tel:0123456789" class="block mt-2 px-4 py-2 rounded-xl text-sm font-bold text-center transition-all" style="background:#FFB200;color:#A60817">Gọi Đặt Hàng</a>
        </div>
      </div>
    </nav>
  `;
  lucide.createIcons();
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
}

/* ---------- Footer ---------- */
async function renderFooter() {
  const footer = document.getElementById('footer');
  if (!footer) return;

  const cfg = await getSiteConfig();
  const phone = cfg.heroPhone || '0123.456.789';
  const address = cfg.contactAddress || '123 Đường 30/4, Quận Ninh Kiều, Cần Thơ';
  const email = cfg.contactEmail || 'contact@banhtrangtronngoncantho.vn';
  const hours = (cfg.contactDays || 'Thứ 2 - Chủ Nhật') + ': ' + (cfg.contactHours || '09:00 - 22:00');
  const fb = cfg.facebookUrl || '#';
  const ig = cfg.instagramUrl || '#';
  const yt = cfg.youtubeUrl || '#';

  footer.innerHTML = `
    <footer style="background:#1a0505;color:white" class="pt-12 pb-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style="background:#FFB200">
                <i data-lucide="flame" class="w-6 h-6" style="color:#A60817"></i>
              </div>
              <div>
                <div class="font-bold text-lg text-white" style="font-family:var(--font-heading)">Bánh Tráng Trộn</div>
                <div class="text-sm" style="color:#FFB200">Ngon Cần Thơ</div>
              </div>
            </div>
            <p class="text-sm leading-relaxed" style="color:#9ca3af">Mang đến hương vị bánh tráng trộn đặc trưng nhất của vùng đất Cần Thơ.</p>
            <div class="flex gap-3 mt-4">
              <a href="${fb}" target="_blank" class="w-9 h-9 rounded-full flex items-center justify-center hover:opacity-80" style="background:#A60817" aria-label="Facebook"><i data-lucide="facebook" class="w-4 h-4"></i></a>
              <a href="${ig}" target="_blank" class="w-9 h-9 rounded-full flex items-center justify-center hover:opacity-80" style="background:#FE5200" aria-label="Instagram"><i data-lucide="instagram" class="w-4 h-4"></i></a>
              <a href="${yt}" target="_blank" class="w-9 h-9 rounded-full flex items-center justify-center hover:opacity-80" style="background:#8A2F2C" aria-label="Youtube"><i data-lucide="youtube" class="w-4 h-4"></i></a>
            </div>
          </div>
          <div>
            <h3 class="font-semibold text-base mb-4" style="font-family:var(--font-heading);color:#FFB200">Liên Kết Nhanh</h3>
            <ul class="space-y-2 text-sm" style="color:#9ca3af">
              <li><a href="index.html" class="hover:text-white transition-colors flex items-center gap-2"><span style="color:#FE5200">›</span> Trang Chủ</a></li>
              <li><a href="menu.html" class="hover:text-white transition-colors flex items-center gap-2"><span style="color:#FE5200">›</span> Thực Đơn</a></li>
              <li><a href="tin-tuc.html" class="hover:text-white transition-colors flex items-center gap-2"><span style="color:#FE5200">›</span> Tin Tức</a></li>
              <li><a href="lien-he.html" class="hover:text-white transition-colors flex items-center gap-2"><span style="color:#FE5200">›</span> Liên Hệ</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-base mb-4" style="font-family:var(--font-heading);color:#FFB200">Thông Tin Liên Hệ</h3>
            <ul class="space-y-3 text-sm" style="color:#9ca3af">
              <li class="flex items-start gap-3"><i data-lucide="map-pin" class="w-4 h-4 flex-shrink-0 mt-0.5" style="color:#FE5200"></i><span>${address}</span></li>
              <li class="flex items-center gap-3"><i data-lucide="phone" class="w-4 h-4" style="color:#FE5200"></i><a href="tel:${phone.replace(/\D/g,'')}" class="hover:text-white transition-colors">${phone}</a></li>
              <li class="flex items-center gap-3"><i data-lucide="mail" class="w-4 h-4" style="color:#FE5200"></i><a href="mailto:${email}" class="hover:text-white transition-colors">${email}</a></li>
              <li class="flex items-center gap-3"><i data-lucide="clock" class="w-4 h-4" style="color:#FE5200"></i><span>${hours}</span></li>
            </ul>
          </div>
        </div>
        <div class="border-t pt-6 flex flex-col md:flex-row items-center justify-between text-xs" style="border-color:#374151;color:#6b7280">
          <div>© ${new Date().getFullYear()} Bánh Tráng Trộn Ngon Cần Thơ. Tất cả quyền được bảo lưu.</div>
          <div class="mt-4 md:mt-0"><a href="admin/login.html" class="hover:text-white transition-colors">Đăng nhập Quản trị viên</a></div>
        </div>
      </div>
    </footer>
  `;
  lucide.createIcons();
}

/* ---------- Cart Drawer ---------- */
function renderCartDrawer() {
  const container = document.getElementById('cart-drawer');
  if (!container) return;

  container.innerHTML = `
    <div class="cart-overlay" id="cart-overlay" onclick="closeCart()"></div>
    <div class="cart-drawer" id="cart-drawer-panel">
      <div class="p-6 border-b flex items-center justify-between">
        <h2 class="text-2xl font-bold text-gray-900" style="font-family:var(--font-heading)">Giỏ hàng</h2>
        <button onclick="closeCart()" class="p-2 hover:bg-gray-100 rounded-full transition-colors"><i data-lucide="x" class="w-6 h-6"></i></button>
      </div>
      <div class="flex-1 overflow-y-auto p-6" id="cart-items-container"></div>
      <div class="p-6 border-t bg-gray-50" id="cart-footer"></div>
    </div>
  `;
  lucide.createIcons();
  refreshCartDrawer();
}

function refreshCartDrawer() {
  const items = Cart.getItems();
  const container = document.getElementById('cart-items-container');
  const footer = document.getElementById('cart-footer');
  if (!container || !footer) return;

  if (items.length === 0) {
    container.innerHTML = `
      <div class="h-full flex flex-col items-center justify-center text-center opacity-50">
        <i data-lucide="shopping-cart" class="w-16 h-16 mb-4"></i>
        <p class="text-lg">Giỏ hàng của bạn đang trống</p>
        <a href="menu.html" class="mt-6 text-[#A60817] font-bold underline">Đi mua sắm ngay</a>
      </div>
    `;
    footer.innerHTML = '';
    lucide.createIcons();
    return;
  }

  container.innerHTML = items.map(item => `
    <div class="flex gap-4 mb-6">
      <div class="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
        <img src="${item.imageUrl}" alt="${item.name}" class="w-full h-full object-cover">
      </div>
      <div class="flex-1 flex flex-col justify-between">
        <div>
          <h4 class="font-bold text-gray-900 line-clamp-1">${item.name}</h4>
          <p class="text-[#A60817] font-bold text-sm">${Cart.formatPrice(item.price)}</p>
        </div>
        <div class="flex items-center justify-between mt-2">
          <div class="flex items-center bg-gray-100 rounded-lg px-2">
            <button onclick="Cart.updateQuantity(${item.id}, ${item.quantity - 1}); refreshCartDrawer();" class="p-1 hover:text-[#A60817]"><i data-lucide="minus" class="w-3.5 h-3.5"></i></button>
            <span class="w-8 text-center text-sm font-bold">${item.quantity}</span>
            <button onclick="Cart.updateQuantity(${item.id}, ${item.quantity + 1}); refreshCartDrawer();" class="p-1 hover:text-[#A60817]"><i data-lucide="plus" class="w-3.5 h-3.5"></i></button>
          </div>
          <button onclick="Cart.removeItem(${item.id}); refreshCartDrawer();" class="text-gray-400 hover:text-red-500 transition-colors"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
        </div>
      </div>
    </div>
  `).join('');

  footer.innerHTML = `
    <div class="flex items-center justify-between mb-6">
      <span class="text-gray-500 font-medium">Tổng thanh toán:</span>
      <span class="text-2xl font-black text-[#A60817]">${Cart.formatPrice(Cart.getTotalPrice())}</span>
    </div>
    <a href="thanh-toan.html" onclick="closeCart()" class="w-full flex items-center justify-center py-4 text-white rounded-2xl font-bold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all" style="background:linear-gradient(135deg,#FFB200,#FE5200)">
      Đặt hàng ngay
    </a>
  `;
  lucide.createIcons();
}

function openCart() { 
  document.getElementById('cart-overlay')?.classList.add('open');
  document.getElementById('cart-drawer-panel')?.classList.add('open');
  refreshCartDrawer();
}
function closeCart() {
  document.getElementById('cart-overlay')?.classList.remove('open');
  document.getElementById('cart-drawer-panel')?.classList.remove('open');
}

/* ---------- Floating Contact ---------- */
async function renderFloatingContact() {
  const el = document.getElementById('floating-contact');
  if (!el) return;
  const cfg = await getSiteConfig();
  const phone = cfg.heroPhone || '0123.456.789';

  el.innerHTML = `
    <div class="floating-contact">
      <a href="https://zalo.me/${phone.replace(/\D/g,'')}" target="_blank" class="floating-btn" style="background:#0068FF" aria-label="Zalo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.04 2 11c0 2.83 1.36 5.35 3.5 7.04V22l3.26-1.79C9.8 20.73 10.87 21 12 21c5.52 0 10-4.04 10-9S17.52 2 12 2zm.36 12.83H9.6c-.29 0-.41-.22-.27-.49l2.72-5.34c.14-.27.49-.27.49.08v3.39h2.52c.29 0 .42.22.28.49l-2.59 5.25c-.14.27-.49.27-.49-.08v-3.3z"/></svg>
      </a>
      <a href="tel:${phone.replace(/\D/g,'')}" class="floating-btn" style="background:linear-gradient(135deg,#A60817,#FE5200)" aria-label="Gọi điện">
        <i data-lucide="phone" class="w-6 h-6"></i>
      </a>
    </div>
  `;
  lucide.createIcons();
}

/* ---------- Toast ---------- */
function showToast(message, duration = 2500) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

/* ---------- Init All Components ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  renderCartDrawer();
  renderFloatingContact();
});
