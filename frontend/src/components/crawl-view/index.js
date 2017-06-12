import { h, Component } from 'preact';
import CrawlCollapsible from '../crawl-collapsible';

export default class CrawlView extends Component {
  state = {
    urlField: 'http://smoolabs.com',
    selectedCrawlId: null
  };

  onCrawlSubmit = e => {
    e.preventDefault();

    if (this.props.onCrawlRequest)
      this.props.onCrawlRequest(this.state.urlField);
  };

  updateUrlField = e => {
    this.setState({
      urlField: e.target.value
    });
  };

  selectCrawl = crawlId => {
    return () => {
      this.setState({
        selectedCrawlId: crawlId
      });
    };
  };

  downloadJSON = crawlId => {
    const crawl = this.props.crawls[crawlId];
    return () => {
      window.open(
        `http://localhost:7000/download-json/${crawlId}.json?json=${encodeURIComponent(JSON.stringify(crawl.meta))}`,
        '_blank'
      );
    };
  };

  render(props, state) {
    console.log(state.urlField);
    return (
      <div>
        <form onSubmit={this.onCrawlSubmit}>
          <input
            type="url"
            placeholder="URL to crawl"
            value={state.urlField}
            onInput={this.updateUrlField}
          />
          <button type="submit">Crawl</button>
        </form>
        <div>
          <h2>Crawl:</h2>
          {state.selectedCrawlId
            ? <CrawlCollapsible
                crawl={props.crawls[state.selectedCrawlId]}
                crawlId={state.selectedCrawlId}
              />
            : <i>Select a Crawl below</i>}

        </div>

        Previous Crawls:
        <table>
          <thead>
            <tr>
              <td>Crawl</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {Object.keys(props.crawls).map((crawlId, index) => {
              const crawl = props.crawls[crawlId];
              return (
                <tr>
                  <td>
                    Crawl {crawlId}
                  </td>
                  <td>
                    <button onClick={this.selectCrawl(crawlId)}>
                      View Crawl
                    </button>
                    <button onClick={this.downloadJSON(crawlId)}>
                      Download JSON
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <table />
      </div>
    );
  }
}
