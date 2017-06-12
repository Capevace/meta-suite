import { h, Component } from 'preact';
import Collapsible from 'react-collapsible';
import style from './style';

const CrawlCollapsible = ({ crawl, crawlId, open }) => (
  <Collapsible
    open={open}
    classParentString={style.collapsible}
    triggerClassName={style.collapsible__trigger}
    triggerOpenedClassName={style.collapsible__trigger_open}
    contentOuterClassName={style.collapsible__contentOuter}
    contentInnerClassName={style.collapsible__contentInner}
    trigger={`▶ Crawl ${crawlId}`}
    triggerWhenOpen={`▼ Crawl ${crawlId}`}
  >
    {Object.keys(crawl.meta).map(url => {
      const meta = crawl.meta[url];
      return (
        <p>
          <span>{url}</span><br />
          <strong>{meta.title}</strong><br />
          <i>{meta.description || 'undefined'}</i>
        </p>
      );
    })}
  </Collapsible>
);

export default CrawlCollapsible;
