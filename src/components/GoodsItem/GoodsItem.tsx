import styles from './GoodsItem.module.css'

function GoodsItem({ good }: any) {

  const { brand, id, price, product } = good
  return (
    <li className={styles.good}>
      <h2 className={styles.good_title}>
        {product}
      </h2>
      <div className={styles.good_row}>
        <label className={styles.good_label}>
          Бренд:
        </label>
        <p className={styles.good_text}>
        {brand === null ? 'Информация отсуствует' : brand}
        </p>
      </div>
      <div className={styles.good_row}>
        <label className={styles.good_label}>
          Цена:
        </label>
        <p className={styles.good_text}>
          {price}
        </p>
      </div>
      <div className={styles.good_row}>
        <label className={styles.good_label}>
          id:
        </label>
        <p className={styles.good_text}>
          {id}
        </p>
      </div>
    </li>);
}

export default GoodsItem;
