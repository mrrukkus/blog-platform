/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import marked from 'marked';
import { Link, Redirect } from 'react-router-dom';
import { Spin }  from "antd";
import 'antd/dist/antd.css';
import { Operation as DataOperation } from '../../reducer/data/data';


import Header from '../header/header';
import Main from '../main/main';
import { Operation as ArticleOperation } from '../../reducer/articles/articles';

import './post-full.css';

const PostFull = (props) => {
  const dispatch = useDispatch();
  const {
    match: {
      params: {slug}
    }
  } = props;

  const [deletionAcception, setDeletionAcception] = useState(false);

  const loadingStatus = useSelector((state) => state.DATA.isLoading);
  const fetchError = useSelector((state) => state.DATA.fetchError);
  const article = useSelector((state) => state.DATA.articleDetails);
  const isSuccess = useSelector((state) => state.ARTICLES.isSuccess);
  const currentUserName = useSelector((state) => state.USER.currentUser ? state.USER.currentUser.username : '');

  const loadArticleHandler = useCallback(() => {
    dispatch(DataOperation.loadArticleDetails(slug));
  }, [slug, dispatch]);

  useEffect(() => {
    loadArticleHandler();
  }, [loadArticleHandler]);

  const tagsList = () => article.tagList.map((tag) => <span className="post__tag" key={Math.random()}>{tag}</span>);

  const getBodyMarkup = () => {
    let rawMarkup = '';
    if (article) {
      rawMarkup = marked(article.body);
      return {__html: rawMarkup};
    }
    return {__html: rawMarkup};
  }

  const acceptionClassname = deletionAcception ? '' : 'acception--hidden';
  const likeStatusClassname = article?.favorited ? 'post__like-button--liked' : '';


  return (isSuccess ? <Redirect to="/" /> :
    <>
      <Header/>
      <Main>
        {fetchError && <span>Возникла ошибка при загрузке данных</span>}
        {loadingStatus ? <Spin /> :
        <article className="post">
          <div className="post__content">
            <div className="post__title-area">
              <h2>{article.title}</h2>
              <div className="post__likes">
              <button type="button" className={`post__like-button post__like-button--not-liked ${likeStatusClassname}`} onClick={() => {
                dispatch(ArticleOperation.likeArticle(article.slug));
              }} />
              <span className="post__likes-count">{article.favoritesCount}</span>
            </div>
            </div>
            <div className="post__tags">
              {tagsList()}
            </div>
            <div className="post__description">
              {article.description}
            </div>
            <div className="post__full-information" dangerouslySetInnerHTML={getBodyMarkup()}/>
          </div>
          <div className="post-author-edit">
            <div className="post-author__author-information">
              <div className="post-author__name-wrapper">
                <span className="post-author__name">{article.author.username}</span>
                <span className="post-author__date">March 5, 2020</span>
              </div>
              <img src={`${article.author.image}`} alt="user" className="post-author__image" width="46" height="46"/>
            </div>
            {currentUserName === article.author.username &&
              <div className="post-author__control-buttons">
                <div role="button" tabIndex={0} className="button button--delete" onClick={() => {
                  setDeletionAcception(true)
                  }} onKeyDown={() => {
                    setDeletionAcception(true)
                    }}>
                  Delete
                  <div className={`acception ${acceptionClassname}`}>
                    <span>Are you sure to delete this article?</span>
                    <div className="acception__buttons">

                      <button
                      type="button" className="acception__button acception__button--cancel" onClick={(evt) => {
                        evt.stopPropagation();
                        setDeletionAcception(false);
                      }}>
                        No
                      </button>

                      <button
                      type="button"
                      className="acception__button acception__button--accept"
                      onClick={() => {
                        dispatch(ArticleOperation.deleteArticle(article));
                      }}>
                        Yes
                      </button>
                    </div>
                    {isSuccess === false && <span className="error">Возникла ошибка</span>}
                  </div>
                </div>
                <Link to={`/articles/${article.slug}/edit`} className="button button--edit">
                  Edit
                </Link>
              </div>
            }
          </div>
        </article>
        }
      </Main>
    </>
  )
};

PostFull.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.string),
    path: PropTypes.string,
    url: PropTypes.string
  }).isRequired,
}


export default PostFull;
