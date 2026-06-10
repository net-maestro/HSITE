// src/config/menu.js
export const menuItems = {
  main: [
    { key: 'internet', label: 'menu.internet', to: '/price/internet-price', icon: 'mdi-microsoft-internet-explorer' },
    { key: 'tv', label: 'menu.tv-list', to: '/price/tv-list', icon: 'mdi-youtube-tv' },
    { key: 'intercom', label: 'menu.intercom', to: '/price/intercom-price', icon: 'mdi-doorbell-video' },
    { key: 'service', label: 'menu.service', to: '/service/test', icon: 'mdi-account-wrench-outline' },
    { key: 'device', label: 'menu.device', to: '/shop', icon: 'mdi-router-wireless' },
    { key: 'promo', label: 'menu.promo', to: '/promo', icon: 'mdi-bullhorn-outline' },
    { key: 'news', label: 'menu.news', to: '/blog', icon: 'mdi-newspaper-variant-outline' },
    { key: 'payment', label: 'menu.payment', to: '/payment-methods', icon: 'mdi-credit-card' },
    { key: 'coverage', label: 'menu.coverage-map', to: '/coverage-map', icon: 'mdi-map-search-outline' },
    { key: 'about', label: 'menu.about-company', to: '/about', icon: 'mdi-script-text-outline' },
    { key: 'contact', label: 'menu.contact', to: '/contact', icon: 'mdi-contacts-outline' },
    { key: 'sitemap', label: 'menu.sitemap', to: '/sitemap', icon: 'mdi-sitemap' },
  ],
  phone: [
    { label: '(067) 131-90-72', tel: '0671319072' },
    { label: '(073) 131-90-72', tel: '0731319072' },
    { label: '(099) 189-37-10', tel: '0991893710' },
  ],
  social: [
    { icon: 'mdi-facebook', link: 'https://www.facebook.com/HappyLinkNetUa' },
    { icon: 'mdi-account-multiple-outline', link: 'https://my.happylink.net.ua' },
    { icon: 'mdi-wechat', link: 'https://www.t.me/HappyLinkNetUa' },
  ],
  docs: [
    { label: 'footer.public-contract', link: '/static/files/pub_ofert.pdf' },
    { label: 'footer.public-contract-intercom', link: '/static/files/pub_ofert_intercom.pdf' },
  ],
};