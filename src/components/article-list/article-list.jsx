import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Spin }  from "antd";
import 'antd/dist/antd.css';
import './article-list.css';

import Header from '../header/header';
import Main from '../main/main';
import Article from '../article/article';
import Pagination from '../pagination/pagination';
import { ActionCreator } from '../../reducer/data/data';
import { DataApiRequests } from '../../api';

const getPosts = (articles) => articles.map((article) => <Article article={article} key={article.createdAt} />);

const ArticleList = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const loadedArticles = useSelector((state) => state.DATA.articles);

  useEffect(() => {
    dispatch(DataApiRequests.loadArticles(currentPage));

    return () => {
      dispatch(ActionCreator.setLoadingStatus(false));
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

export default ArticleList;