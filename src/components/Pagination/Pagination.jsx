import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './pagination.css';

import { Operation } from '../../reducer/data/data';


const Pagination = ({ currentPage, onPageNumberClick }) => {
  const paginationLinks = [];
  const pagesCount = useSelector((state) => state.DATA.pagesCount);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Operation.getPagesCount());
  }, [pagesCount, dispatch])

  for (let i = 1; i <= pagesCount; i++) {
    paginationLinks.push(<a href={`#${i}`} className={`pagination__number ${currentPage === i ? `pagination__number--active` : null}`} onClick={onPageNumberClick} key={i}>{i}</a>)
  }

  return (
    <>
      {!pagesCount ?
        <div className="pagination">
          <h1>Загрузка...</h1>
        </div> :
        <div className="pagination">
          <button className="pagination__arrow pagination__prev"></button>
          <div className="pagination__numbers">
            {paginationLinks}
          </div>
          <button className="pagination__arrow pagination__next"></button>
        </div>
      }
    </>
  )
};

export default Pagination;