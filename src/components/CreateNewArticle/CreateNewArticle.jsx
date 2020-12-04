import './CreateNewArticle.css';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';

const CreateNewArticle = () => {
  return (
    <>
      <Header/>
      <Main>
        <form action="" className="new-article">
          <h2>Create new article</h2>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" placeholder="Title"/>

          <label htmlFor="short-description">Short description</label>
          <input type="text" id="short-description" placeholder="Title"/>

          <label htmlFor="">Text</label>
          <textarea name="Text" id="text" cols="30" rows="10" className="new-article__text" placeholder="Text" ></textarea>

          <div className="new-article__tags">
            <h3>Tags</h3>
            <div className="new-article__tag-container">
              <input type="text" className="new-article__tag-title" placeholder="Tag"/>
              <button className="button button--delete">Delete</button>
            </div>
            <div className="new-article__new-tag-container">
              <input type="text" className="new-article__tag-title" placeholder="Tag"/>
              <button className="button button--delete">Delete</button>
              <button className="button button--add">Add tag</button>
            </div>
          </div>

          <button type="submit" className="new-article__submit-button">Send</button>
        </form>
      </Main>
    </>
  )
};

export default CreateNewArticle;
