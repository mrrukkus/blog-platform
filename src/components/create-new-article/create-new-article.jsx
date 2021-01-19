import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../header/header';
import Main from '../main/main';
import { ActionCreator } from '../../reducer/articles/articles';
import { ArticlesApiRequests } from '../../api';

import './create-new-article.css';
import routePaths from '../../routes';

const CreateNewArticle = () => {
  const dispatch = useDispatch();

  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [textValue, setTextValue] = useState('');
  const [tagsList, setTagsList] = useState([]);
  const [newTagValue, setNewTagValue] = useState('');

  const isSuccess = useSelector((state) => state.ARTICLES.isSuccess);

  useEffect(() => () => {
    dispatch(ActionCreator.setSuccess(null));
  }, [dispatch]);

  const onTagAdd = (evt) => {
    if (newTagValue.trim().length > 0) {
      evt.preventDefault();
      setTagsList([...tagsList, newTagValue.trim()]);
      setNewTagValue('');
    }
  };

  const onTagDelete = useCallback((i) => {
    const newTagsList = [...tagsList.slice(0, i), ...tagsList.slice(i + 1)];
    setTagsList(newTagsList);
  }, [tagsList]);

  const newArticleSubmit = (evt) => {
    evt.preventDefault();
    const newArticle = {
      "title": titleValue,
      "description": descriptionValue,
      "body": textValue,
      "tagList": tagsList
    };

    dispatch(ArticlesApiRequests.addNewArticle(newArticle));
  };

  const TagsMarkup = useMemo(() => tagsList.map((tag, i) =>
    (
      <div className="new-article__tag-container" key={Math.random()}>
        <input type="text" className="new-article__tag-title" placeholder="Tag" value={tag} disabled="true"/>
        <button type='button' className="button button--delete" onClick={() => onTagDelete(i)}>Delete</button>
      </div>
    )
  ), [tagsList, onTagDelete]);

  return (isSuccess ? <Redirect to={routePaths.main} /> :
    <>
      <Header/>
      <Main>
        <form className="new-article" onSubmit={newArticleSubmit}>
          <h2>Create new article</h2>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" placeholder="Title" onChange={(evt) => {
            setTitleValue(evt.target.value);
          }}/>

          <label htmlFor="short-description">Short description</label>
          <input type="text" id="short-description" placeholder="Title" onChange={(evt) => {
            setDescriptionValue(evt.target.value);
          }}/>

          <label htmlFor="text">Text</label>
          <textarea name="Text" id="text" cols="30" rows="10" className="new-article__text" placeholder="Text" onChange={(evt) => {
            setTextValue(evt.target.value);
          }} />

          <div className="new-article__tags">
            <h3>Tags</h3>
            {TagsMarkup}
            <div className="new-article__new-tag-container">
              <input type="text" className="new-article__tag-title" placeholder="Tag" value={newTagValue} onChange={(evt) => {
                setNewTagValue(evt.target.value);
              }}/>
              <button type='button' className="button button--add" onClick={onTagAdd}>Add tag</button>
            </div>
          </div>

          <button type='submit' className="new-article__submit-button">Send</button>
          {isSuccess === false && <span className="error">Возникла ошибка</span>}
        </form>
      </Main>
    </>
  )
};

export default CreateNewArticle;
