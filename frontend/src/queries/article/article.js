import gql from "graphql-tag";

const ARTICLE_QUERY = gql`
  query Article($slug: String!) {
    articles(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          slug
          title
          content
          comments {
            data {
              attributes {
                content
              }
            }
          }
          category {
            data {
              attributes {
                slug
                name
              }
            }
          }
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export default ARTICLE_QUERY;