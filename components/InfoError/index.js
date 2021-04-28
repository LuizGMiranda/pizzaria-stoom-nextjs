import styles from '../../styles/InfoError.module.css'

function InfoError({children}) {
  return <span className={styles.infoError}>{children}</span>;
}

export default InfoError;