import './Pagination.css';

const Pagination = () => {
  return (
    <div className="pagination">
      <button className="pagination__arrow pagination__prev"></button>
      <div className="pagination__numbers">
        <a href="#1" className="pagination__number pagination__number--active">1</a>
        <a href="#2" className="pagination__number ">2</a>
        <a href="#3" className="pagination__number ">3</a>
        <a href="#4" className="pagination__number ">4</a>
        <a href="#5" className="pagination__number ">5</a>
      </div>
      <button className="pagination__arrow pagination__next"></button>
    </div>
  )
};

export default Pagination;