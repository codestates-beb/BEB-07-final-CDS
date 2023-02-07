// modules
import '../assets/css/pagination.css';
import Pagination from 'react-js-pagination';

function Paging(props) {
  return (
    <Pagination
      activePage={props.page} // 현재 페이지
      itemsCountPerPage={props.limit} // 한 페이지랑 보여줄 아이템 갯수
      totalItemsCount={props.totalPosts} // 총 아이템 갯수
      pageRangeDisplayed={5} // paginator의 페이지 범위
      prevPageText={'‹'} // "이전"을 나타낼 텍스트
      nextPageText={'›'} // "다음"을 나타낼 텍스트
      onChange={props.handlePageChange} // 페이지 변경을 핸들링하는 함수
    />
  );
}

export default Paging;
