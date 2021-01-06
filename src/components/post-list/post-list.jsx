import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Spin }  from "antd";
import 'antd/dist/antd.css';
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
  console.log(!!loadedArticles, loadedArticles, 'bool');

  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  console.log("=======>");
  console.log(currentPage);
  console.log('rendered');
  console.log("<=======");

  useEffect(() => {
    dispatch(Operation.loadArticles(currentPage));
  }, [currentPage, dispatch]);

  return (
    <>
      <Header/>
      <Main>
        <>
        <ul className="posts">
          {!loadedArticles ? <Spin /> : getPosts(loadedArticles)}
        </ul>
        <Pagination currentPage={currentPage} onPageNumberClick={setCurrentPage}/>
        </>
      </Main>
    </>
  )
}

export default PostList;