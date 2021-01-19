import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Spin }  from "antd";
import PropTypes from 'prop-types';

import Header from '../header/header';
import Main from '../main/main';
import { ActionCreator } from '../../reducer/articles/articles';
import api, { ArticlesApiRequests } from '../../api';
import routePaths, { localStorageActions } from '../../routes';

import '../create-new-article/create-new-article.css';
import 'antd/dist/antd.css';


const ArticleForm = (props) => {
  const dispatch = useDispatch();
  const {
    match: {
      params: {slug}
    },
    match: {path}
  } = props;

  const isSuccess = useSelector((state) => state.ARTICLES.isSuccess);
  const isLoading = useSelector((state) => state.ARTICLES.isLoading);

  const currentUserName = JSON.parse(localStorageActions.getUser()).username;

  const newArticleClass = 'new-article';


  const [newTagValue, setNewTagValue] = useState('');
  const [articleData, setArticleData] = useState({
    titleValue: '',
    descriptionValue: '',
    textValue: '',
    tagsList: [],
    articleAuthor: ''
  });

  useEffect(() => {
    if (path === routePaths.articleEditStatic) {
      api.get(`articles/${slug}`)
        .then((res) => {
          const { title, description, body, tagList, author } = res.data.article;
          setArticleData({
            titleValue: title,
            descriptionValue: description,
            textValue: body,
            tagsList: tagList,
            articleAuthor: author
          });
          dispatch(ActionCreator.setIsLoading(false));
        })
        .catch((err) => { throw err });
    }
    if (path === routePaths.newArticle) {
      setArticleData({
        titleValue: '',
        descriptionValue: '',
        textValue: '',
        tagsList: [],
        articleAuthor: ''
      });
      dispatch(ActionCreator.setIsLoading(false));
    }
  }, [slug, dispatch, path]);

  useEffect(() => () => {
    dispatch(ActionCreator.setSuccess(null));
  }, [dispatch]);

  const { titleValue, descriptionValue, textValue, tagsList, articleAuthor } = articleData;

  const onTagAdd = (evt) => {
    evt.preventDefault();
    if (newTagValue.trim().length > 0) {
      setArticleData({...articleData, tagsList: [...tagsList, newTagValue.trim()]});
      setNewTagValue('');
    }
  };

  const onTagDelete = useCallback((i) => {
    const newTagsList = [...tagsList.slice(0, i), ...tagsList.slice(i + 1)];
    setArticleData({...articleData, tagsList: newTagsList});
  }, [tagsList, articleData]);

  const TagsMarkup = useMemo(() => tagsList?.map((tag, i) => (
    <div className={`${newArticleClass}__tag-container`} key={Math.random()}>
      <input type="text" className={`${newArticleClass}__tag-title`} placeholder="Tag" value={tag} disabled/>
      <button type='button' className="button button--delete" onClick={() => onTagDelete(i)}>Delete</button>
    </div>
  )
), [tagsList, onTagDelete]);

  const articleSubmit = (evt) => {
    evt.preventDefault();
    const dataArticle = {
      "title": titleValue,
      "description": descriptionValue,
      "body": textValue,
      "tagList": tagsList
    };
    if (path === routePaths.articleEditStatic) {
      dispatch(ArticlesApiRequests.putEditedArticle(dataArticle, slug));
      dispatch(ActionCreator.setIsLoading(true));
    }
    if (path === routePaths.newArticle) {
      dispatch(ArticlesApiRequests.addNewArticle(dataArticle));
      dispatch(ActionCreator.setIsLoading(true));
    }
  };

  const getFormHeader = () => {
    if (path === routePaths.articleEditStatic) {
      return 'Edit article'
    }
    if (path === routePaths.newArticle) {
      return 'Create new article'
    }
    return null
  };


  if (path === routePaths.articleEditStatic) {
    if (articleAuthor.username && (isSuccess || currentUserName !== articleAuthor.username)) {
      return <Redirect to={routePaths.main} />
    }
  }
  if (path === routePaths.newArticle && isSuccess) {
    return <Redirect to={routePaths.main} />
  }

  return (
    <>
      <Header/>
        <Main>
          {isLoading ? <Spin /> :
            <form className={newArticleClass} onSubmit={articleSubmit}>
              <h2>{getFormHeader()}</h2>
              <label htmlFor="title">Title</label>
              <input disabled={isLoading} type="text" id="title" placeholder="Title"
              value={titleValue}
              onChange={(evt) => {
                setArticleData({...articleData, titleValue: evt.target.value});
              }}/>

              <label htmlFor="short-description">Short description</label>
              <input disabled={isLoading} type="text" id="short-description" placeholder="Title"
              value={descriptionValue}
              onChange={(evt) => {
                setArticleData({...articleData, descriptionValue: evt.target.value});
              }}/>

              <label htmlFor="text">Text</label>
              <textarea disabled={isLoading} name="Text" id="text" cols="30" rows="10" className={`${newArticleClass}__text`} placeholder="Text"
              value={textValue}
              onChange={(evt) => {
                setArticleData({...articleData, textValue: evt.target.value});
              }}/>

              <div className={`${newArticleClass}__tags`}>
                <h3>Tags</h3>
                {TagsMarkup}
                <div className={`${newArticleClass}__new-tag-container`}>
                  <input disabled={isLoading} type="text" className="new-article__tag-title" placeholder="Tag" value={newTagValue} onChange={(evt) => {
                    setNewTagValue(evt.target.value);
                  }}/>
                  <button type='button' className="button button--add" onClick={onTagAdd}>Add tag</button>
                </div>
              </div>

              <button type='submit' className={`${newArticleClass}__submit-button`} disabled={isLoading}>Send</button>
              {isSuccess === false && <span className="error">Возникла ошибка</span>}
            </form>
          }
        </Main>
    </>
  )
};

ArticleForm.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.string),
    path: PropTypes.string,
    url: PropTypes.string
  }).isRequired,
}

export default ArticleForm;