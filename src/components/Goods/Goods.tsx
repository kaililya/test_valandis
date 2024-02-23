import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { fetchDataLengthThunk, fetchDataThunk, fetchFilteredDataThunk } from "../../store/thunks/goods-thunk";
import GoodsItem from "../GoodsItem/GoodsItem";
import styles from './Goods.module.css'
import Loader from "../../ui/Loader/Loader";
import Error from "../../ui/Error/Error";

const Goods = ():JSX.Element => { 
  const dispatch = useAppDispatch()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.size >= 2) {
      dispatch(fetchFilteredDataThunk())
    } else {
      dispatch(fetchDataThunk())
      dispatch(fetchDataLengthThunk())
    }
  }, [])

  const { goodsArray, 
    getAllGoods,
    getAllGoodsSuccess,
    getAllGoodsFailed } = useAppSelector((store) => store.goodsReducer);

  if(getAllGoods) {
    return (
    <div className={styles.loader_container}>
      <Loader size={100} />
     </div>)
  }

  if(getAllGoodsFailed) {
    return (
      <div className={styles.error_container}>
        <Error/>
        <p className={styles.error_text}>
          Временная ошибка. Пару секунд...
        </p>
      </div>
    )
  }

  if(goodsArray.length === 0 && getAllGoodsSuccess) {
    return (
    <div className={styles.text_no_data_container}>
      <p className={styles.text_no_data}>
        Товаров с такими параметрами нет
      </p>
    </div>
    )
  }

  return (
    <section className={styles.main_container}>
      <div className={styles.goods_container_wrapper}>
        <ul className={styles.goods_container}>
          {goodsArray.map((item) => (
            <GoodsItem key={item.id} good={item} />
          ))}
        </ul>
      </div>
    </section>);
}

export default Goods;
