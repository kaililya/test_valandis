import { Link, useLocation } from 'react-router-dom';
import Goods from '../../components/Goods/Goods';
import Filters from '../../ui/Filters/Filters';
import Pagination from '../../ui/Pagination/Pagination';
import styles from './MainPage.module.css'
import { modalPATH } from '../../utils/constants';

function MainPage() {
  const location = useLocation();

  return (
  <div className={styles.main_container}>
    <Link 
      to={modalPATH}
      state={{ background: location }}
      className={styles.title}
    >
      Как работает сайт
    </Link>
    <Filters/>
    <Goods />
    <Pagination/>
  </div>);
}

export default MainPage;
