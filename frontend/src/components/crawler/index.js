import { h, Component } from 'preact';
// import { Link } from 'preact-router/match';
// import style from './style';
import io from 'socket.io-client';
import CrawlView from '../crawl-view';

export default class Crawler extends Component {
  crawlPage = url => {
    const crawlId = String(Math.floor(Math.random() * 9999));

    this.socket = io('http://localhost:7000/crawler');
    this.socket.on('connect', () => {
      this.setState({ connected: true });
    });

    this.socket.on(`crawl-${crawlId}-update`, ({ meta, queue, urlsFound }) => {
      this.updateCrawl(crawlId, {
        meta: meta,
        queue: queue,
        lastFoundCount: urlsFound.length
      });
    });

    this.socket.on(`crawl-${crawlId}-error`, ({ errorUrls }) => {
      this.updateCrawl(crawlId, {
        errorUrls
      });
    });

    this.socket.on(`crawl-${crawlId}-result`, ({ meta }) => {
      this.updateCrawl(crawlId, {
        meta: meta,
        lastFoundCount: 0
      });
    });

    this.socket.emit('crawl-request', {
      url,
      crawlId
    });
  };

  updateCrawl(crawl, updates) {
    this.setState({
      crawls: {
        ...this.state.crawls,
        [crawl]: {
          ...this.state.crawls[crawl],
          ...updates
        }
      }
    });
  }

  state = {
    connected: false,
    crawls: {}
  };

  componentWillUnmount() {
    // if (this.socket) this.socket.disconnect();
  }

  render(props, state) {
    return (
      <div>
        Crawler
        <CrawlView
          crawls={state.crawls}
          onCrawlRequest={url => this.crawlPage(url)}
        />
      </div>
    );
  }
}
