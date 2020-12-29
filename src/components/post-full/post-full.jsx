import { Operation as DataOperation } from '../../reducer/data/data';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import marked from 'marked';
import { Link } from 'react-router-dom';

import Header from '../header/header.jsx';
import Main from '../main/main.jsx';
import { Operation as ArticleOperation, ActionCreator } from '../../reducer/articles/articles';

import './post-full.css';

const PostFull = (props) => {
  const dispatch = useDispatch();
  const slug = props.match.params.slug;

  const loadArticleHandler = useCallback(() => {
    dispatch(DataOperation.loadArticleDetails(slug));
  }, [slug, dispatch]);

  useEffect(() => {
    loadArticleHandler();
  }, [loadArticleHandler]);

  const article = useSelector((state) => state.DATA.articleDetails);
  console.log(article);

  const currentUserName = useSelector((state) => {
    return state.USER.currentUser ? state.USER.currentUser.username : '';
  });

  const [deletionAcception, setDeletionAcception] = useState(false);


  const tagsList = () => {
    return article.tagList.map((tag, i) => <span className="post__tag" key={i}>{tag}</span>);
  };

  const getBodyMarkup = () => {
    let rawMarkup = '';
    if (article) {
      rawMarkup = marked(article.body);
      return {__html: rawMarkup};
    }
    return {__html: rawMarkup};
  }

  const loadingStatus = useSelector((state) => state.DATA.isLoading);
  const acceptionClassname = deletionAcception ? '' : 'acception--hidden';
  const likeStatusClassname = article?.favorited ? 'post__like-button--liked' : '';


  return (
    <>
      <Header/>
      <Main>
        {loadingStatus ? <h1>Загрузка...</h1> :
        <article className="post">
          <div className="post__content">
            <div className="post__title-area">
              <h2>{article.title}</h2>
              <div className="post__likes">
              <button className={`post__like-button post__like-button--not-liked ${likeStatusClassname}`} onClick={() => {
                dispatch(ArticleOperation.likeArticle(article.slug));
              }}></button>
              <span className="post__likes-count">{article.favoritesCount}</span>
            </div>
            </div>
            <div className="post__tags">
              {tagsList()}
            </div>
            <div className="post__description">
              {article.description}
            </div>
            <div className="post__full-information" dangerouslySetInnerHTML={getBodyMarkup()}>
            </div>
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
                <div className="button button--delete" onClick={() => {
                  setDeletionAcception(true)
                  }}>
                  Delete
                  <div className={`acception ${acceptionClassname}`}>
                    <span>Are you sure to delete this article?</span>
                    <div className="acception__buttons">

                      <button className="acception__button acception__button--cancel" onClick={(evt) => {
                        evt.stopPropagation();
                        setDeletionAcception(false);
                      }}>
                        No
                      </button>

                      <button className="acception__button acception__button--accept"
                      onClick={() => {
                        dispatch(ArticleOperation.deleteArticle(article));
                      }}>
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
                <Link to={`/articles/${article.slug}/edit`} className="button button--edit" onClick={() => {
                  dispatch(ActionCreator.setEditArticle(article))
                }}>
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

export default PostFull;
