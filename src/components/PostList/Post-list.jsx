import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Post from '../Post/Post.jsx';
import Pagination from '../Pagination/Pagination.jsx';

import './Post-List.css';

const getPosts = (posts) => {
  return posts.map((post) => <Post post={post} key={post.id} />);
};

const PostList = ({ posts }) => {
  return (
    <>
      <Header/>
      <Main>
        <ul className="posts">
          {getPosts(posts)}
        </ul>
      </Main>
      <Pagination/>
    </>
  )
}

export default PostList;