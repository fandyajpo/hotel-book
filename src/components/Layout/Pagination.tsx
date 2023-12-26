import Pagination from "react-js-pagination";
export interface PagingInterface {
  currentPage: number;
  total: number;
  limit: number;
  updatePage: (page: number) => void;
}

const Paging = (props: PagingInterface) => {
  return props.total < props.limit ? null : (
    <Pagination
      activePage={parseInt(props.currentPage as any)}
      itemsCountPerPage={props.limit}
      totalItemsCount={props.total}
      pageRangeDisplayed={4}
      onChange={(page: number) => props.updatePage(page)}
      disabledClass="hidden"
      itemClass={`page-link w-10 h-10 duration-500 bg-black rounded-md items-center justify-center flex mr-2 hover:bg-blue-600`}
      linkClass="text-white w-full h-full flex items-center justify-center"
      activeClass="w-10 h-10 bg-blue-500 shadow-md rounded-md items-center justify-center flex mr-2 hover:bg-blue-600"
      firstPageText={<span>{"<<"}</span>}
      lastPageText={<span>{">>"}</span>}
    />
  );
};

export default Paging;
