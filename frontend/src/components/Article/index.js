import React from "react";
import { useParams } from "react-router";
import Query from "../../components/Query";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";

import ARTICLE_QUERY from "../../queries/article/article";
import './index.scss';

const Article = () => {
  let { slug } = useParams();
  const [comment,setComment] = React.useState('');

  const handleSubmit = (e,id) => {
    e.preventDefault();

    const apiUrl = "http://localhost:1337/api/comments";
    fetch(apiUrl, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({
        "data":{
          "article": id,
          "content": comment
        }
       })
     } )
      .then((response) => {
        console.log(response.status);
        if (response.status === 400) {
          return Promise.reject("Invalid input")
        }
        return response.json()
      })

      .then((responseJson) => {
        console.log(responseJson);

      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleChange = (e) => {
    setComment(e.target.value)
    //console.log(comment)
  }
  return (
    <Query query={ARTICLE_QUERY} slug={slug}>
      {({ data: { articles } }) => {
        if (articles.data.length) {
          const imageUrl =
            process.env.NODE_ENV !== "development"
              ? articles.data[0].attributes.image.data.attributes.url
              : process.env.REACT_APP_BACKEND_URL +
                articles.data[0].attributes.image.data.attributes.url;

          return (
            <div className="article">
              <div
                id="banner"
                className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
                data-src={imageUrl}
                data-srcset={imageUrl}
                data-uk-img
              >
                <h1>{articles.data[0].attributes.title}</h1>
              </div>

              <div className="uk-section">
                <div className="uk-container uk-container-small">
                
                  <ReactMarkdown children={articles.data[0].attributes.content} 
                  transformImageUri={uri =>
                    uri.startsWith("http") ? uri : `${ process.env.REACT_APP_BACKEND_URL }${uri}`
                  }
                  />
                  <p>
                    <Moment format="MMM Do YYYY">
                      {articles.data[0].attributes.published_at}
                    </Moment>
                  </p>
                  <div className="comments">
                    {/* {articles.data[0].id} */}
                    <div style={{color:'red'}}>Comments</div>
                    {(articles.data[0].attributes.comments.data[0])
                      ?articles.data[0].attributes.comments.data.map( (comment,i) => (<div key={i}>{comment.attributes.content}</div>))
                      : <span>no comments yet</span>
                    }
                  </div>
                  <div >
                    <textarea onChange={handleChange} value={comment} rows="4" cols="50"></textarea>
                    <button onClick={(e) => handleSubmit(e,articles.data[0].id)}>Submit</button>
                  </div>
                </div>
                
              </div>
              
            </div>
          );
        }
      }}
    </Query>
  );
};

export default Article;