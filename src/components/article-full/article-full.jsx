/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown  from 'react-markdown';
import { Link, Redirect } from 'react-router-dom';
import { Spin }  from "antd";
import 'antd/dist/antd.css';
import classNames from 'classnames';
import { DataApiRequests, ArticlesApiRequests } from '../../api';
import routePaths from '../../routes';


import Header from '../header/header';
import Main from '../main/main';

import './article-full.css';

const ArticleFull = (props) => {
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
    dispatch(DataApiRequests.loadArticleDetails(slug));
  }, [slug, dispatch]);

  useEffect(() => {
    loadArticleHandler();
  }, [loadArticleHandler]);

  const postClass = 'post';
  const postAuthorClass = 'post-author';
  const buttonClass = 'button';

  const tagsList = () => article.tagList.map((tag) => <span className={`${postClass}__tag`} key={Math.random()}>{tag}</span>);

  const acceptionClass = classNames('acception', {
    'acception--hidden': !deletionAcception
  });
  const postLikeClass = classNames(`${postClass}__like-button`, {
    [`${postClass}__like-button--liked`]: article?.favorited,
    [`${postClass}__like-button--not-liked`]: !article?.favorited
  });


  return (isSuccess ? <Redirect to={routePaths.main} /> :
    <>
      <Header/>
      <Main>
        {fetchError && <span>Возникла ошибка при загрузке данных</span>}
        {loadingStatus ? <Spin /> :
        <article className={postClass}>
          <div className={`${postClass}__content`}>
            <div className={`${postClass}__title-area`}>
              <h2>{article.title}</h2>
              <div className={`${postClass}__likes`}>
              <button type="button" className={postLikeClass} onClick={() => {
                dispatch(ArticlesApiRequests.likeArticle(article.slug));
              }} />
              <span className={`${postClass}__likes-count`}>{article.favoritesCount}</span>
            </div>
            </div>
            <div className={`${postClass}__tags`}>
              {tagsList()}
            </div>
            <div className={`${postClass}__description`}>
              {article.description}
            </div>
            <div className={`${postClass}__full-information`}>
              <ReactMarkdown>
                {article.body}
              </ReactMarkdown>
            </div>
          </div>
          <div className={`${postAuthorClass}-edit"`}>
            <div className={`${postAuthorClass}__author-information`}>
              <div className={`${postAuthorClass}__name-wrapper`}>
                <span className={`${postAuthorClass}__name`}>{article.author.username}</span>
                <span className={`${postAuthorClass}__date`}>March 5, 2020</span>
              </div>
              <img src={`${article.author.image}`} alt="user" className={`${postAuthorClass}__image`} width="46" height="46"/>
            </div>
            {currentUserName === article.author.username &&
              <div className={`${postAuthorClass}__control-buttons`}>
                <div role="button" tabIndex={0} className={`${buttonClass}--delete`} onClick={() => {
                  setDeletionAcception(true)
                  }} onKeyDown={() => {
                    setDeletionAcception(true)
                    }}>
                  Delete
                  <div className={acceptionClass}>
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
                        dispatch(ArticlesApiRequests.deleteArticle(article));
                      }}>
                        Yes
                      </button>
                    </div>
                    {isSuccess === false && <span className="error">Возникла ошибка</span>}
                  </div>
                </div>
                <Link to={routePaths.articleEditDynamic(article.slug)} className={`${buttonClass}--edit`}>
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

ArticleFull.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.string),
    path: PropTypes.string,
    url: PropTypes.string
  }).isRequired,
}


export default ArticleFull;
