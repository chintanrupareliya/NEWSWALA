import React, {useEffect, useState} from "react";
import Newsitem from "./Newsitem";
import Loding from "./Loding";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
  const [articles, setArticles] = useState([]);
  const [loding, setLoding] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitlizeFirstlatter = (String) => {
    let temp = String.toLowerCase();
    return temp.charAt(0).toUpperCase() + temp.slice(1);
  };
  // document.title = `${capitlizeFirstlatter(
  //    props.category
  // )}- NewsWala`;

  const updatenews = async () => {
    props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoding(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parshdata = await data.json();
    props.setProgress(70);
    setArticles(parshdata.articles);
    setTotalResults(parshdata.totalResults);
    setLoding(false);
    props.setProgress(100);
  };
  useEffect(() => {
    updatenews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);
    setLoding(true);
    let data = await fetch(url);
    let parshdata = await data.json();
    setArticles(articles.concat(parshdata.articles));
    setTotalResults(parshdata.totalResults);
    setLoding(false);
  };

  return (
    <div className="container">
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Loding />}
      >
        <h1 className="my-3 text-center">
          Todays top {capitlizeFirstlatter(props.category)} HeadLine
        </h1>
        {loding && <Loding />}
        <div className="row">
          {articles.map((element) => {
            return (
              <div className="col-md-4 my-2" key={element.url}>
                <Newsitem
                  title={element.title ? element.title : ""}
                  discription={element.description ? element.description : " "}
                  imgurl={element.urlToImage}
                  newsurl={element.url}
                  author={element.author}
                  date={new Date(element.publishedAt).toGMTString()}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}
News.defaultProps = {
  pageSize: 3,
  category: "general",
  country: "in",
};

News.propTypes = {
  pageSize: PropTypes.number,
  category: PropTypes.string,
  country: PropTypes.string,
};
