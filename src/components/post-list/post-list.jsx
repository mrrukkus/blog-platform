import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import './post-list.css';

import Header from '../header/header.jsx';
import Main from '../main/main.jsx';
import Post from '../post/post.jsx';
import Pagination from '../pagination/pagination.jsx';
import { Operation } from '../../reducer/data/data';


const getPosts = (posts) => {
  return posts.map((post) => <Post post={post} key={post.createdAt} />);
};

const PostList = () => {
  const loadedArticles = useSelector((state) => state.DATA.articles);

  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  console.log("=======>");
  console.log(loadedArticles);
  console.log('rendered');
  console.log("<=======");

  useEffect(() => {
    dispatch(Operation.loadArticles(currentPage));
  }, [currentPage, dispatch]);

  const onPageNumberClick = (e) => {
    setCurrentPage(+e.target.innerText);
  };

  return (
    <>
      <Header/>
      <Main>
        {!loadedArticles ?
          <ul className="posts">
            <h1>Загрузка...</h1>
          </ul> :
          <>
          <ul className="posts">
            {getPosts(loadedArticles)}
          </ul>
          <Pagination currentPage={currentPage} onPageNumberClick={onPageNumberClick}/>
          </>
        }
      </Main>
    </>
  )
}

export default PostList;