import Header from '../header/header.jsx';
import Main from '../main/main.jsx';
// import Post from '../Post/Post.jsx';
import Pagination from '../pagination/pagination.jsx';

import './post-list.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';

// const getPosts = (posts) => {
//   return posts.map((post) => <Post post={post} key={post.id} />);
// };

const PostList = ({ posts }) => {
  const loadingStatus = useSelector((state) => state.DATA.isLoading);
  const pagesCount = useSelector((state) => state.DATA.pagesCount);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageNumberClick = (e) => {
    setCurrentPage(+e.target.innerText);
  }

  console.log(pagesCount);
  return (
    <>
      <Header/>
      <Main>
        {loadingStatus ?
          <ul className="posts">
            <h1>Загрузка...</h1>
          </ul> :
          <ul className="posts">
            {/* {getPosts(posts)} */}
          </ul>
        }
        <Pagination pagesCount={pagesCount} currentPage={currentPage} onPageNumberClick={onPageNumberClick}/>
      </Main>
    </>
  )
}

export default PostList;