import { useEffect, useState } from "react";
import styles from "./Pagination.module.css";
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { fetchDataThunk } from "../../store/thunks/goods-thunk";
import { useSearchParams } from "react-router-dom";
import Loader from "../Loader/Loader";

const Pagination = (): JSX.Element => {

  const [search, setSearch] = useSearchParams();
  const dispatch = useAppDispatch();

  const {
    countOfPage: countsOfPagesFromServer,
    isFilteredRequest,
    getAllGoodsLength,
    goodsArray,
    getAllGoods
  } = useAppSelector((store) => store.goodsReducer);
  const [currentPage, setCurrentPage] = useState(1);

  const setUrlPage = (page: number = 1) => {
    search.set('page', page.toString());
    setSearch(search, {
      replace: true,
    });
  }

  useEffect(() => {
    setUrlPage()
  }, [])

  useEffect(() => {
    dispatch(fetchDataThunk())
  }, [currentPage])


  const handleSetNextPage = () => {
    if (countsOfPagesFromServer && currentPage < countsOfPagesFromServer) {
      setCurrentPage(prev => prev + 1);
      setUrlPage(currentPage + 1);
    }
  };

  const handleSetPrevioustPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      setUrlPage(currentPage - 1);
    }
  };

  const handleSetFirstPage = () => {
    setCurrentPage(1);
    setUrlPage(1);
  };

  const handleSetLastPage = () => {
    if (countsOfPagesFromServer) {
      setCurrentPage(countsOfPagesFromServer);
      setUrlPage(countsOfPagesFromServer);
    }
  };

  const prevPageClassName = () => currentPage === 1 ? `${styles.buttom_arrow__disabled} ${styles.button_arrow_wrapper}` : `${styles.button_arrow_wrapper}`;
  const nextPageClassName = () => currentPage === countsOfPagesFromServer ? `${styles.buttom_arrow__disabled} ${styles.button_arrow_wrapper}` : `${styles.button_arrow_wrapper}`;

  return (
    <div className={styles.main_container}>
      {isFilteredRequest && goodsArray.length !== 0 ? (
        <p className={styles.text_error}>Фильтрованные данные не могут быть с пагинацией, так как при action: filter невозможно передать в парметры limit и offset.</p>
      ) : (
        <>
          <button
            disabled={getAllGoods}
            type="button"
            className={prevPageClassName()}
            onClick={handleSetFirstPage}
          >
            <div className={styles.button_arrow}>
              <MdOutlineKeyboardDoubleArrowRight
                size={"24px"}
                className={`${styles.arrow_double} ${styles.arrow_double__left}`}
              />
            </div>
          </button>
          <button
            disabled={getAllGoods}
            type="button"
            className={prevPageClassName()}
            onClick={handleSetPrevioustPage}
          >
            <div className={styles.button_arrow}>
              <MdKeyboardArrowRight
                size={"24px"}
                className={`${styles.arrow} ${styles.arrow__left}`}
              />
            </div>
          </button>
          <div className={styles.pagination_container_wrapper}>
            <div className={styles.pagination_container}>
              {getAllGoodsLength ? (
                <div className={styles.loader_container}>
                  <Loader size={30} />
                </div>
              ) : (
                <>
                  <p className={`${styles.pagination_number} ${styles.pagination_number__cuurent}`}>
                    {countsOfPagesFromServer === 0 ? 0 : currentPage}
                  </p>
                  <p className={`${styles.pagination_number} ${styles.pagination_number__slash}`}>
                    &#47;
                  </p>
                  <p className={`${styles.pagination_number} ${styles.pagination_number__all}`}>
                    {countsOfPagesFromServer}
                  </p>
                </>
              )}
            </div>
          </div>
          <button
            disabled={getAllGoods}
            type="button"
            className={nextPageClassName()}
            onClick={handleSetNextPage}
          >
            <div className={styles.button_arrow}>
              <MdKeyboardArrowRight
                size={"24px"}
                className={`${styles.arrow} ${styles.arrow__right} `}
              />
            </div>
          </button>
          <button
            disabled={getAllGoods}
            type="button"
            className={nextPageClassName()}
            onClick={handleSetLastPage}
          >
            <div className={styles.button_arrow}>
              <MdOutlineKeyboardDoubleArrowRight
                size={"24px"}
                className={`${styles.arrow_double} ${styles.arrow_double__right}`}
              />
            </div>
          </button>
        </>
      )}
    </div>
  );
}

export default Pagination;
