import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Spin }  from "antd";
import 'antd/dist/antd.css';
import './post-list.css';

import Header from '../header/header';
import Main from '../main/main';
import Post from '../post/post';
import Pagination from '../pagination/pagination';
import { Operation, ActionCreator } from '../../reducer/data/data';


const getPosts = (posts) => posts.map((post) => <Post post={post} key={post.createdAt} />);

const PostList = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const loadedArticles = useSelector((state) => state.DATA.articles);

  useEffect(() => {
    dispatch(Operation.loadArticles(currentPage));

    return () => {
      dispatch(ActionCreator.setLoadingStatus(null));
    }
  }, [currentPage, dispatch]);


  return (
    <>
      <Header/>
      <Main>
        {!loadedArticles ? <Spin /> :
        <>
          <ul className="posts">
            {getPosts(loadedArticles)}
          </ul>
          <Pagination currentPage={currentPage} onPageNumberClick={setCurrentPage}/>
        </>
        }
      </Main>
    </>
  )
}

export default PostList;