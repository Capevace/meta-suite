const { crawl } = require('meta-crawler');
const cuid = require('cuid');

module.exports = function handleCrawlerSocket(io) {
  io.on('connection', socket => {
    console.log('Connection to /crawler');

    socket.on('crawl-request', async payload => {
      console.log('Crawl Request:', payload.crawlId);

      const meta = await crawl(payload.url, {
        log: false,
        blacklist: payload.blacklist || [],
        required: payload.required || [],
        callback: state => {
          console.log('Crawl Update:', payload.crawlId);
          socket.emit(`crawl-${payload.crawlId}-update`, {
            queue: state.urls,
            urlsFound: state.linksFound,
            meta: state.meta
          });
        },
        errorCallback: ({ url, errorUrls }) => {
          console.log('Crawl Error:', payload.crawlId);
          socket.emit(`crawl-${payload.crawlId}-error`, { url, errorUrls });
        }
      });

      console.log('Crawl Result:', payload.crawlId);
      socket.emit(`crawl-${payload.crawlId}-result`, {
        meta
      });
    });
  });
};
