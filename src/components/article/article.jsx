/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import classNames from 'classnames';

import { ArticlesApiRequests, DataApiRequests } from '../../api';
import routePaths from '../../routes';

import './article.css';

const Article = ({ article }) => {
  const dispatch = useDispatch();
  const authorizationStatus = useSelector((state) => state.USER.authorizationStatus);
  const [liked, setLiked] = useState(article.favorited);
  const [likesCount, setLikesCount] = useState(article.favoritesCount)
  const onLikeClick = () => {
    if (!liked) {
      dispatch(ArticlesApiRequests.likeArticle(article.slug));
      setLiked(true);
      setLikesCount(() => likesCount + 1);
    } else {
      dispatch(ArticlesApiRequests.dislikeArticle(article.slug));
      setLiked(false);
      setLikesCount(() => likesCount - 1);
    }
  };
  const postClass = 'post';
  const postAuthorClass = 'post-author';

  const tagsList = () => article.tagList.map((tag) => <span className={`${postClass}__tag`} key={Math.random()}>{tag}</span>);

  const likeStatusClass = classNames(`${postClass}__like-button`, {
    [`${postClass}__like-button--liked`]: liked,
    [`${postClass}__like-button--not-liked`]: !liked
  });

  const articleDate = format(new Date(article.createdAt), 'PP');

  return (
    <li>
      <article className={postClass}>
        <div className={`${postClass}__content`}>
          <div className={`${postClass}__title-area`}>
            <Link to={routePaths.articleDynamic(article.slug)} onClick={() => {
              dispatch(DataApiRequests.loadArticleDetails(article.slug));
            }}>{article.title}</Link>
            <div className={`${postClass}__likes`}>
              <button
                type="button"
                className={likeStatusClass}
                disabled={!authorizationStatus}
                onClick={onLikeClick}
              />
              <span className={`${postClass}__likes-count`}>{likesCount}</span>
            </div>
          </div>
          <div className={`${postClass}__tags`}>
            {tagsList()}
          </div>
          <div className={`${postClass}__description`}>
            {article.description}
          </div>
        </div>
        <div className={postAuthorClass}>
          <div className={`${postAuthorClass}__name-wrapper`}>
            <span className={`${postAuthorClass}__name`}>{article.author.username}</span>
            <span className={`${postAuthorClass}__date`}>{articleDate}</span>
          </div>
          <img src={article.author.image ? `${article.author.image}` : `user.png`} alt="user-avatar" width="46" height="46"/>

        </div>
      </article>
    </li>
  )
};

Article.propTypes = {
  article: PropTypes.shape({
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

export default Article;
