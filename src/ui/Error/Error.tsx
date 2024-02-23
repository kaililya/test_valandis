import { BiSolidError } from 'react-icons/bi';
import styles from './Error.module.css'


function Error() {
  return (
  <div>            
    <BiSolidError color='#fecd03' className={styles.error_sign} size={80} />
  </div>
  )

}

export default Error;
