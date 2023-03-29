import React, {Component} from "react";
import Newsitem from "./Newsitem";
import Loding from "./Loding";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  capitlizeFirstlatter = (String) => {
    let temp = String.toLowerCase();
    return temp.charAt(0).toUpperCase() + temp.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loding: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitlizeFirstlatter(
      this.props.category
    )}- NewsWala`;
  }
  static defaultProps = {
    pageSize: 3,
    category: "general",
    country: "in",
  };

  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
    country: PropTypes.string,
  };
  async updatenews() {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loding: true});
    let data = await fetch(url);
    this.props.setProgress(30);
    let parshdata = await data.json();
    this.props.setProgress(70);
    
    this.setState({
      articles: parshdata.articles,
      totalResults: parshdata.totalResults,
      loding: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updatenews();
  }

  fetchMoreData = async () => {
    this.setState({page: this.state.page + 1});
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=${this.props.apiKey}&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({loding: true});
    let data = await fetch(url);
    let parshdata = await data.json();
    this.setState({
      articles: this.state.articles.concat(parshdata.articles),
      totalResults: parshdata.totalResults,
      loding: false,
    });
  };
  render() {
    return (
      <div className="container">
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loding />}
        >
          <h1 className="my-3 text-center">
            Todays top {this.capitlizeFirstlatter(this.props.category)} HeadLine
          </h1>
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4 my-2" key={element.url}>
                  <Newsitem
                    title={element.title ? element.title : ""}
                    discription={
                      element.description ? element.description : " "
                    }
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
}
