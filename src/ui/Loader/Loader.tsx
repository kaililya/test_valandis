import { TailSpin } from "react-loader-spinner";
import styles from './Loader.module.css'


function Loader({size}:any) {
  return (<div className={styles.spiner}>
  <TailSpin
    color="#292982"
    radius={"3px"}
    width={size}
    height={size}
    wrapperClass={styles.spiner}
  />
</div>);
}

export default Loader;
