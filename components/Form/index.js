import styles from '../../styles/Form.module.css'

function Form(props) {
  return (
    <form className={styles.form} {...props}>
        {props.children}
    </form>
  );
}

export default Form;