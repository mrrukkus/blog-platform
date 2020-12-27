import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import format from 'date-fns/format';

import {Operation as DataOperation} from '../../reducer/data/data';
import './post.css';
import {Operation as ArticlesOperation} from '../../reducer/articles/articles';

const Post = ({ post }) => {
  const tagsList = () => {
    return post.tagList.map((tag, i) => <span className="post__tag" key={i}>{tag}</span>);
  };

  const postDate = format(new Date(post.createdAt), 'PP');

  const likeStatusClassname = post.favorited ? 'post__like-button--liked' : 'post__like-button--not-liked';

  const dispatch = useDispatch();
  return (
    <li>
      <article className="post">
        <div className="post__content">
          <div className="post__title-area">
            <Link to={`/articles/${post.slug}`} onClick={() => {
              dispatch(DataOperation.loadArticleDetails(post.slug));
            }}>{post.title}</Link>
            <div className="post__likes">
              <button className={`post__like-button ${likeStatusClassname}`} onClick={() => {
                dispatch(ArticlesOperation.likeArticle(post.slug));
              }}></button>
              <span className="post__likes-count">{post.favoritesCount}</span>
            </div>
          </div>
          <div className="post__tags">
            {tagsList()}
          </div>
          <div className="post__description">
            {post.description}
          </div>
        </div>
        <div className="post-author">
          <div className="post-author__name-wrapper">
            <span className="post-author__name">{post.author.username}</span>
            <span className="post-author__date">{postDate}</span>
          </div>
          <img src={`${post.author.image}`} alt="user" className="post-author__image" width="46" height="46"/>
        </div>
      </article>
    </li>
  )
};

export default Post;
