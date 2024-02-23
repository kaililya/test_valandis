import { useState } from 'react';
import styles from './Filters.module.css';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { fetchDataLengthThunk, fetchDataThunk, fetchFilteredDataThunk } from '../../store/thunks/goods-thunk';



const Filters = () => {
  const [search, setSearch] = useSearchParams();

  const formClassName = false ? `${styles.filters_container}` : `${styles.filters_container} ${styles.filters_container__hidden}`

  const dispatch = useAppDispatch();

  const handelResetFilters = () => {
    search.delete('product');
    search.delete('price');
    search.delete('brand');
    setInputNameValue('')
    setInputPriceValue('')
    setInputBrandValue('')

    setSearch(search, {
      replace: true,
    });

    dispatch(fetchDataThunk())
    dispatch(fetchDataLengthThunk())

  }
  let url = new URL(window.location.href);
  let params = new URLSearchParams(url.search);

  const [inputNameValue, setInputNameValue] = useState(params.getAll('product')[0]);
  const [inputPriceValue, setInputPriceValue] = useState(params.getAll('price')[0]);
  const [inputBrandValue, setInputBrandValue] = useState(params.getAll('brand')[0]);


  const handelInputNameChange = (e: any) => {
    setInputNameValue(e.target.value)

    if (e.target.value === '') {
      search.delete('product');
      setSearch(search, {
        replace: true,
      });
    } else {
      search.set('product', e.target.value);
      setSearch(search, {
        replace: true,
      });
    }
  }

  const handelInputBrandChange = (e: any) => {
    setInputBrandValue(e.target.value)

    if (e.target.value === '') {
      search.delete('brand');
      setSearch(search, {
        replace: true,
      });
    } else {
      search.set('brand', e.target.value);
      setSearch(search, {
        replace: true,
      });
    }
  }

  const handelInputPriceChange = (e: any) => {

    setInputPriceValue(e.target.value)
    
    if (e.target.value === '') {
      search.delete('price');
      setSearch(search, {
        replace: true,
      });
    } else {
      search.set('price', e.target.value);
      setSearch(search, {
        replace: true,
      });
    }
  }


  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(fetchFilteredDataThunk())
  }

  const buttonDisabled = !inputNameValue && !inputPriceValue && !inputBrandValue
  return (
    <div className={styles.main_container}>
      <form className={formClassName} onSubmit={handleSubmit}>
        <ul className={styles.filters}>
          <li className={styles.filter}>
            <label className={styles.label} htmlFor="">
              Название товара
            </label>
            <input
              className={styles.input}
              value={inputNameValue}
              placeholder='Введите название'
              type="text"
              onChange={handelInputNameChange} />
          </li>
          <li className={styles.filter}>
            <label className={styles.label} htmlFor="">
              Цена товара
            </label>
            <input
              className={styles.input}
              value={inputPriceValue}
              type="number"
              placeholder="Введите цену"
              min={0}
              onChange={handelInputPriceChange}
            />
          </li>
          <li className={styles.filter}>
            <label className={styles.label} htmlFor="">
              Бренд
            </label>
            <input
              className={styles.input}
              value={inputBrandValue}
              placeholder="Введите бренд"
              type="text"
              onChange={handelInputBrandChange}
            />
          </li>
        </ul>
        <ul className={styles.buttons_container}>
          <li className={styles.button_item}>
            <button
              className={buttonDisabled ? `${styles.button} ${styles.button__disabled}` : `${styles.button}`}
              type="submit"
              disabled={buttonDisabled}
            >
              Приметь
            </button>
          </li>
          <li className={styles.button_item}>
            <button
              className={buttonDisabled ? `${styles.button} ${styles.button__disabled}  ${styles.button__type_reset}` : `${styles.button}  ${styles.button__type_reset}`}
              type="submit"
              onClick={handelResetFilters}
              disabled={buttonDisabled}
            >
              Сбросить (все)
            </button>
          </li>
        </ul>
      </form>
    </div>
  )
}

export default Filters;
