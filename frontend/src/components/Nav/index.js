import React from "react";
import Query from "../Query";
import { Link } from "react-router-dom";
import './index.scss';

import CATEGORIES_QUERY from "../../queries/category/categories";

const Nav = () => {
  return (
    <div>
      <Query query={CATEGORIES_QUERY} id={null}>
        {({ data: { categories } }) => {
          return (
            <div className="header">
              <nav className="uk-navbar-container" data-uk-navbar>
                <div className="uk-navbar-left">
                  <ul className="uk-navbar-nav">
                    <li className="brand-logo">
                      <Link to="/">
                      <span className="primary-text">Bari</span>
                      <span className="nav-text">Koi </span> 
                      <span>&nbsp; Blog</span></Link>
                    </li>
                  </ul>
                </div>

                <div className="uk-navbar-right">
                  <ul className="uk-navbar-nav">
                    {categories.data.map((category) => {
                      return (
                        <li className="category" key={category.attributes.slug}>
                          <Link
                            to={`/category/${category.attributes.slug}`}
                            className="uk-link-reset"
                          >
                            {category.attributes.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </nav>
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default Nav;