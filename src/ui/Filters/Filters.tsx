import { SyntheticEvent, useState } from 'react';
import styles from './Filters.module.css';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { fetchDataLengthThunk, fetchDataThunk, fetchFilteredDataThunk } from '../../store/thunks/goods-thunk';
import { updateUrlParams } from '../../utils/update-url-params';



const Filters = ():JSX.Element => { 

  const [search, setSearch] = useSearchParams();
  const dispatch = useAppDispatch();

  let url = new URL(window.location.href);
  let params = new URLSearchParams(url.search);

  const [inputNameValue, setInputNameValue] = useState(params.getAll('product')[0]);
  const [inputPriceValue, setInputPriceValue] = useState(params.getAll('price')[0]);
  const [inputBrandValue, setInputBrandValue] = useState(params.getAll('brand')[0]);

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
  

  const handelInputNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNameValue(e.target.value)
    updateUrlParams('product', search, e, setSearch)

  }

  const handelInputBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputBrandValue(e.target.value)
    updateUrlParams('brand', search, e, setSearch)
  }

  const handelInputPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPriceValue(e.target.value)
    updateUrlParams('price', search, e, setSearch)
  }

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    dispatch(fetchFilteredDataThunk())
  }

  const formClassName = false ? `${styles.filters_container}` : `${styles.filters_container} ${styles.filters_container__hidden}`
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
