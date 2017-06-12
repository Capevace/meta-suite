import { h, Component } from 'preact';
import style from './style';
import Crawler from 'async!../../components/crawler';

export default class CrawlerPage extends Component {
  render({ user }, { time, count }) {
    return (
      <div class={style.profile}>
        <h1>Crawler</h1>
        <p>Crawl a page</p>

        <Crawler />
      </div>
    );
  }
}
