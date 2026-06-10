const { SitemapStream, streamToPromise } = require('sitemap');
const fs = require('fs');
const path = require('path');

// Определите базовый URL вашего сайта
const BASE_URL = 'https://happylink.net.ua/';

// Укажите все маршруты вашего приложения npm run generate-sitemap
const routes = [
  '/',
  '/faq',
  '/about',
  '/docs',
  '/blog',
  '/shop',
  '/sitemap',
  '/contact',
  '/promotions',
  '/loyalty-program',
  '/payment-methods',
  '/price/tv-list',
  '/price/internet-price',
  '/price/intercom-price',
  '/service/test',
  '/coverage-map',
  
];

// Создаем поток для карты сайта
const sitemapStream = new SitemapStream({ hostname: BASE_URL });

// Добавляем каждый маршрут в карту сайта
routes.forEach(route => {
  sitemapStream.write({ url: route, changefreq: 'daily', priority: 0.8 });
});

// Завершаем поток
sitemapStream.end();

// Преобразуем поток в буфер и сохраняем файл
streamToPromise(sitemapStream)
  .then(data => {
    fs.writeFileSync(path.resolve(__dirname, '../../public/sitemap.xml'), data.toString());
    console.log('Sitemap создан!');
  })
  .catch(error => {
    console.error('Ошибка создания sitemap:', error);
  });
