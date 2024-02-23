import { BiSolidError } from 'react-icons/bi';
import styles from './Error.module.css'


const Error = ():JSX.Element => { 
  return (
  <div>            
    <BiSolidError color='#fecd03' className={styles.error_sign} size={80} />
  </div>
  )

}

export default Error;
