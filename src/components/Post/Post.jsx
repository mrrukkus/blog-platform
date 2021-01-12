/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import format from 'date-fns/format';

import {Operation as DataOperation} from '../../reducer/data/data';
import {Operation as ArticlesOperation} from '../../reducer/articles/articles';

import './post.css';

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(post.favorited);
  const [likesCount, setLikesCount] = useState(post.favoritesCount)
  const onLikeClick = () => {
    if (!liked) {
      dispatch(ArticlesOperation.likeArticle(post.slug));
      setLiked(true);
      setLikesCount(() => likesCount + 1);
      // post.favoritesCount+=1;
    } else {
      dispatch(ArticlesOperation.dislikeArticle(post.slug));
      setLiked(false);
      setLikesCount(() => likesCount - 1);
      // post.favoritesCount-=1;
    }
  };

  const tagsList = () => post.tagList.map((tag) => <span className="post__tag" key={Math.random()}>{tag}</span>);

  const likeStatusClassname = liked ? 'post__like-button--liked' : 'post__like-button--not-liked';
  const postDate = format(new Date(post.createdAt), 'PP');

  return (
    <li>
      <article className="post">
        <div className="post__content">
          <div className="post__title-area">
            <Link to={`/articles/${post.slug}`} onClick={() => {
              dispatch(DataOperation.loadArticleDetails(post.slug));
            }}>{post.title}</Link>
            <div className="post__likes">
              <button type="button" className={`post__like-button ${likeStatusClassname}`} onClick={onLikeClick}/>
              <span className="post__likes-count">{likesCount}</span>
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
          <img src={post.author.image ? `${post.author.image}` : `user.png`} alt="user-avatar" width="46" height="46"/>

        </div>
      </article>
    </li>
  )
};

Post.propTypes = {
  post: PropTypes.shape({
    author: PropTypes.shape({
      bio: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.oneOf([null]).isRequired,
      ]),
      following: PropTypes.bool.isRequired,
      image: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    favorited: PropTypes.bool.isRequired,
    favoritesCount: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired
}

export default Post;
