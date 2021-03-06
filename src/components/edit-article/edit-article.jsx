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

const EditArticle = (props) => {
  const dispatch = useDispatch();
  const {
    match: {
      params: {slug}
    }
  } = props;

  const isSuccess = useSelector((state) => state.ARTICLES.isSuccess);
  const isLoading = useSelector((state) => state.ARTICLES.isLoading);

  const currentUserName = JSON.parse(localStorageActions.getUser()).username;

  const [newTagValue, setNewTagValue] = useState('');
  const [articleData, setArticleData] = useState({
    titleValue: '',
    descriptionValue: '',
    textValue: '',
    tagsList: [],
    articleAuthor: ''
  });

  const { titleValue, descriptionValue, textValue, tagsList, articleAuthor } = articleData;

  useEffect(() => {
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
  }, [slug, dispatch]);

  useEffect(() => () => {
      dispatch(ActionCreator.setSuccess(null));
    }, [dispatch]);


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

  const editedArticleSubmit = (evt) => {
    evt.preventDefault();
    const editedArticle = {
      "title": titleValue,
      "description": descriptionValue,
      "body": textValue,
      "tagList": tagsList
    };

    dispatch(ArticlesApiRequests.putEditedArticle(editedArticle, slug));
    dispatch(ActionCreator.setIsLoading(true));
  };

  const TagsMarkup = useMemo(() => tagsList?.map((tag, i) => (
      <div className="new-article__tag-container" key={Math.random()}>
        <input type="text" className="new-article__tag-title" placeholder="Tag" value={tag} disabled="true"/>
        <button type='button' className="button button--delete" onClick={() => onTagDelete(i)}>Delete</button>
      </div>
    )
  ), [tagsList, onTagDelete]);

  return (
    <>
      {articleAuthor.username && ((isSuccess || currentUserName !== articleAuthor.username) && <Redirect to={routePaths.main}/>)}
      <Header/>
        <Main>
          {isLoading ? <Spin /> :
            <form className="new-article" onSubmit={editedArticleSubmit}>
              <h2>Edit article</h2>
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
              <textarea disabled={isLoading} name="Text" id="text" cols="30" rows="10" className="new-article__text" placeholder="Text"
              value={textValue}
              onChange={(evt) => {
                setArticleData({...articleData, textValue: evt.target.value});
              }}/>

              <div className="new-article__tags">
                <h3>Tags</h3>
                {TagsMarkup}
                <div className="new-article__new-tag-container">
                  <input disabled={isLoading} type="text" className="new-article__tag-title" placeholder="Tag" value={newTagValue} onChange={(evt) => {
                    setNewTagValue(evt.target.value);
                  }}/>
                  <button type='button' className="button button--add" onClick={onTagAdd}>Add tag</button>
                </div>
              </div>

              <button type='submit' className="new-article__submit-button" disabled={isLoading}>Send</button>
              {isSuccess === false && <span className="error">Возникла ошибка</span>}
            </form>
          }

        </Main>
    </>
  )
};

EditArticle.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.string),
    path: PropTypes.string,
    url: PropTypes.string
  }).isRequired,
}

export default EditArticle;
