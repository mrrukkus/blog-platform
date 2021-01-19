import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, Pagination as AntdPagination}  from "antd";
import PropTypes from 'prop-types';
import './pagination.css';
import 'antd/dist/antd.css';

import { ActionCreator } from '../../reducer/data/data';
import { ARTICLES_COUNT_TO_SHOW, DataApiRequests } from '../../api';


const Pagination = ({ onPageNumberClick, currentPage }) => {
  const articlesCount = useSelector((state) => state.DATA.articlesCount);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(DataApiRequests.getPagesCount());
  }, [articlesCount, dispatch])

  useEffect(() => dispatch(ActionCreator.setLoadingStatus(null)))

  return (
    <>
      {!articlesCount ?
        <div className="pagination">
          <Spin />
        </div> :
        <div className="pagination">
          <AntdPagination
            current={currentPage}
            size="small"
            total={articlesCount}
            pageSize={ARTICLES_COUNT_TO_SHOW}
            showSizeChanger={false}
            onChange={(page) => {
              onPageNumberClick(+page);
            }}/>
        </div>
      }
    </>
  )
};

Pagination.propTypes = {
  onPageNumberClick: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
}

export default Pagination;