import React from "react";




export default  function Newsitem(props){
    let {title, discription, imgurl, newsurl, date, author, source} = props;
    return (
      <div>
        <div className="card">
          <img
            src={
              imgurl
                ? imgurl
                : "https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg"
            }
            className="card-img-top"
            alt=""
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{discription}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                by {author ? author : "Unkonwn "}
                {date}
              </small>
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                position: "absolute",
                right: "0",
                top:"0"
              }}
            >
              <span className=" badge rounded-pill bg-danger">
                {source}
              </span>
            </div>
            <a
              href={newsurl}
              target="_blank"
              className="btn btn-dark bg-dark"
              rel="noreferrer"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  
}
