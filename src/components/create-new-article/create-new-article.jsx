import './create-new-article.css';
import Header from '../header/header.jsx';
import Main from '../main/main.jsx';
import { useCallback, useMemo, useState } from 'react';
import { Operation } from '../../reducer/articles/articles';
import { useDispatch } from 'react-redux';

const CreateNewArticle = () => {
  const dispatch = useDispatch();
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [textValue, setTextValue] = useState('');
  const [tagsList, setTagsList] = useState([]);

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

  const newArticleSubmit = (evt) => {
    evt.preventDefault();
    const newArticle = {
      "title": titleValue,
      "description": descriptionValue,
      "body": textValue,
      "tagList": tagsList
    }

    dispatch(Operation.addNewArticle(newArticle));
  };


  return (
    <>
      <Header/>
      <Main>
        <form action="" className="new-article" onSubmit={newArticleSubmit}>
          <h2>Create new article</h2>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" placeholder="Title" onChange={(evt) => {
            setTitleValue(evt.target.value);
          }}/>

          <label htmlFor="short-description">Short description</label>
          <input type="text" id="short-description" placeholder="Title" onChange={(evt) => {
            setDescriptionValue(evt.target.value);
          }}/>

          <label htmlFor="">Text</label>
          <textarea name="Text" id="text" cols="30" rows="10" className="new-article__text" placeholder="Text" onChange={(evt) => {
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

export default CreateNewArticle;
