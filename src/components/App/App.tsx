import MainPage from '../../pages/MainPage/MainPage';
import { mainPATH, modalPATH } from '../../utils/constants';
import About from '../About/About';
import Modal from '../Modal/Modal';
import styles from './App.module.css';
import { Route, Routes, useLocation } from 'react-router-dom';

function App() {

  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <div className={styles.main_container}>
      <main className={styles.wrapper}>
        <Routes location={background || location}>
          <Route path={mainPATH} element={<MainPage />} />
        </Routes>
        {background && (
          <Routes>
            <Route path={modalPATH} element={
            <Modal>
              <About />
            </Modal>} />
          </Routes>
        )}
      </main>
    </div>
  )
}

export default App
