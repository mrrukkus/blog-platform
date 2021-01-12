import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, Pagination as AntdPagination}  from "antd";
import PropTypes from 'prop-types';
import './pagination.css';
import 'antd/dist/antd.css';

import { Operation, ARTICLES_COUNT_TO_SHOW } from '../../reducer/data/data';


const Pagination = ({ onPageNumberClick }) => {
  const articlesCount = useSelector((state) => state.DATA.articlesCount);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Operation.getPagesCount());
  }, [articlesCount, dispatch])

  return (
    <>
      {!articlesCount ?
        <div className="pagination">
          <Spin />
        </div> :
        <div className="pagination">
          <AntdPagination
            size="small"
            total={`${articlesCount}`}
            pageSize={`${ARTICLES_COUNT_TO_SHOW}`}
            showSizeChanger={false}
            onChange={(page) => {
              onPageNumberClick(+page);
            }}/>
        </div>
      }
    </>
  )
};

Pagination.defaultProp = {
  onPageNumberClick: () => {}
};

Pagination.propTypes = {
  onPageNumberClick: PropTypes.func.isRequired
}

export default Pagination;