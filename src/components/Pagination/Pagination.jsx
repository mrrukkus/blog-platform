import './pagination.css';

const Pagination = ({ pagesCount, currentPage, onPageNumberClick }) => {
  const paginationLinks = [];

  for (let i = 1; i <= pagesCount; i++) {
    paginationLinks.push(<a href={`#${i}`} className={`pagination__number ${currentPage === i ? `pagination__number--active` : null}`} onClick={onPageNumberClick} key={i}>{i}</a>)
  }

  return (
    <div className="pagination">
      <button className="pagination__arrow pagination__prev"></button>
      <div className="pagination__numbers">
        {paginationLinks}
      </div>
      <button className="pagination__arrow pagination__next"></button>
    </div>
  )
};

export default Pagination;