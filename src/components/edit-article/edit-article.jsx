import '../create-new-article/create-new-article.css';
import Header from '../header/header.jsx';
import Main from '../main/main.jsx';
import { useCallback, useMemo, useState } from 'react';
import { Operation } from '../../reducer/articles/articles';
import { useDispatch, useSelector } from 'react-redux';

const EditArticle = () => {
  const { title, body, tagList, description, slug } = useSelector((state) => state.ARTICLES.articleToEdit);
  const dispatch = useDispatch();
  const [titleValue, setTitleValue] = useState(title);
  const [descriptionValue, setDescriptionValue] = useState(description);
  const [textValue, setTextValue] = useState(body);
  const [tagsList, setTagsList] = useState(tagList);
  console.log('|', titleValue, '|', descriptionValue, '|', textValue, '|', tagsList, '|');
  const [newTagValue, setNewTagValue] = useState('');

  const onTagAdd = (evt) => {
    console.log(tagsList, newTagValue);
    evt.preventDefault();
    setTagsList([...tagsList, newTagValue]);
    setNewTagValue('');
  };

  // const onTagDelete = (i) => {
  //   const newTagsList = [...tagsList.slice(0, i), ...tagsList.slice(i + 1)];
  //   setTagsList(newTagsList);
  // };

  const onTagDelete = useCallback((i) => {
    const newTagsList = [...tagsList.slice(0, i), ...tagsList.slice(i + 1)];
    setTagsList(newTagsList);
  }, [tagsList]);

  const TagsMarkup = useMemo(() => tagsList.map((tag, i) => {
    return (
      <div className="new-article__tag-container" key={i}>
        <input type="text" className="new-article__tag-title" placeholder="Tag" value={tag} readOnly/>
        <button type='button' className="button button--delete" onClick={() => onTagDelete(i)}>Delete</button>
      </div>
    )
  }), [tagsList, onTagDelete]);

  // const returnTagsMarkup = () => {
  //   tagsList.map((tag, i) => {
  //     return (
  //       <div className="new-article__tag-container" key={i}>
  //         <input type="text" className="new-article__tag-title" placeholder="Tag" value={tag}/>
  //         <button className="button button--delete" onClick={() => onTagDelete(i)}>Delete</button>
  //       </div>
  //     )
  //   });
  // };

  const editedArticleSubmit = (evt) => {
    evt.preventDefault();
    const editedArticle = {
      "title": titleValue,
      "description": descriptionValue,
      "body": textValue,
      "tagList": tagsList
    };

    console.log(editedArticle.title, slug);

    dispatch(Operation.putEditedArticle(editedArticle, slug));
  };


  return (
    <>
      <Header/>
      <Main>
        <form className="new-article" onSubmit={editedArticleSubmit}>
          <h2>Edit article</h2>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" placeholder="Title"
          value={titleValue}
          onChange={(evt) => {
            setTitleValue(evt.target.value);
          }}/>

          <label htmlFor="short-description">Short description</label>
          <input type="text" id="short-description" placeholder="Title"
          value={descriptionValue}
          onChange={(evt) => {
            setDescriptionValue(evt.target.value);
          }}/>

          <label htmlFor="">Text</label>
          <textarea name="Text" id="text" cols="30" rows="10" className="new-article__text" placeholder="Text"
          value={textValue}
          onChange={(evt) => {
            setTextValue(evt.target.value);
          }}></textarea>

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
        </form>
      </Main>
    </>
  )
};

export default EditArticle;
