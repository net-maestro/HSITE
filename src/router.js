import { createWebHistory, createRouter } from "vue-router";
import store from "@/store";

const routes = [
  { path: "/", name: "Домашня", component: () => import("@/views/Template2.vue") },
  { path: "/about", name: "Про компанію", component: () => import("@/views/AboutCompany.vue") },
  { path: "/blog", name: "Блог", component: () => import("@/views/Blog.vue") },
  { path: "/docs", name: "Документи", component: () => import("@/views/Documents.vue") },
  { path: "/shop", name: "Пристрої", component: () => import("@/views/ShopView.vue") },
  { path: "/payment-methods", name: "Способи оплати", component: () => import("@/views/PaymentMethods.vue") },
  { path: "/loyalty-program", name: "Програма Лояльності", component: () => import("@/views/LoyaltyProgram.vue") },
  { path: "/contact", name: "Контакти", component: () => import("@/views/Contact.vue") },
  { path: "/price/internet-price", name: "Інтернет", component: () => import("@/views/prices/TestPrice.vue") },
  { path: "/faq", name: "FAQ", component: () => import("@/views/prices/FAQ.vue") },
  { path: "/price/tv-list", name: "IPTV", component: () => import("@/views/TV.vue") },
  { path: "/price/intercom-price", name: "Домофон", component: () => import("@/views/prices/IntercomPrice.vue") },
  { path: "/service/test", name: "Послуги", component: () => import("@/views/services/TestService.vue") },
  { path: "/coverage-map", name: "Карта покриття", component: () => import("@/views/ProviderCoverageMap.vue") },
  { path: "/promotions", name: "Акції", component: () => import("@/views/Promotions.vue") },
  {
  path: '/promo/:id',
  name: 'PromoDetail',
  component: () => import('@/views/PromoDetail.vue'),
  meta: { title: 'Акція' }
},

  { path: "/surveillance", name: "Відеонагляд", component: () => import("@/views/Surveillance.vue") },
  { path: "/sitemap", name: "Сайт-мап", component: () => import("@/views/Sitemap.vue") },
  { path: "/checkout", name: "Оформлення замовлення", component: () => import("@/views/Checkout.vue") },
  { path: "/:catchAll(.*)", name: "404", component: () => import("@/views/PageNotFound.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  store.previousRoute = from;
  
  // SEO: Update document title dynamically based on route name or meta title
  const pageTitle = to.meta.title || to.name || 'Хеппілінк';
  if (to.path === '/') {
    document.title = 'Хеппілінк - Інтернет для дому та бізнесу | HappyLink';
  } else {
    document.title = `${pageTitle} | HappyLink`;
  }
  
  next();
});

export default router;
