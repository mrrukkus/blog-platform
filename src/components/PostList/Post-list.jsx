import Post from '../Post/Post.jsx';
import './Post-List.css';

const getPosts = (posts) => {
  return posts.map((post) => <Post post={post} key={post.id} />);
};

const PostList = ({ posts }) => {
  return (
    <ul className="posts">
      {getPosts(posts)}
    </ul>
  )
}

export default PostList;