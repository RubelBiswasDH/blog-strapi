import React from "react";
import Articles from "../../components/Articles";
import Query from "../../components/Query";
import ARTICLES_QUERY from "../../queries/article/articles";
import "./index.scss";

const Home = () => {
  return (
    <div className="articles">
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>BariKoi blog</h1>
          <Query query={ARTICLES_QUERY}>
            {({ data: { articles } }) => {
              return <Articles articles={articles.data} />;
            }}
          </Query>
        </div>
      </div>
    </div>
  );
};

export default Home