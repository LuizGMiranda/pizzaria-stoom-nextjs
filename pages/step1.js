import * as yup from "yup";
import { useFormik } from "formik";
import Router from "next/router";

import styles from "../styles/Step1.module.css";

import { useDispatch } from 'react-redux'
import { setStep1 } from '../redux/userSlice'

import HeaderPage from "../components/HeaderPage";
import Form from "../components/Form";
import Container from "../components/Container";
import InfoError from "../components/InfoError";
import Title from "../components/Title";

const validationSchema = yup.object().shape({
  size: yup.string().required("tamanho,"),
  dough: yup.string().required("massa,"),
  border: yup.string().required("borda,"),
});

function Step1() {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      size: "",
      dough: "",
      border: "",
    },
    onSubmit: (values) => {
      console.log('onSubmit', values);
      dispatch(setStep1({values}))
      Router.push("/step2");
    },
    validationSchema,
  });

  return (
    <Container>
      <HeaderPage title="Pizzaria Stoom - Passo 01" />
      <Title>Passo 1</Title>
      <p>Iremos escolher tamanho, massa e a borda</p>
      <Form>
        <ul>
          <li className={styles.item}>
            <p className={styles.itemTitle}>Tamanho</p>
            <select
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="size"
              name="size"
              className={styles.select}
            >
              <option selected="selected" disabled>
                Selecione o tamanho da pizza
              </option>
              <option value="gigante">Gigante (12 fatias)</option>
              <option value="grande">Grande (8 fatias)</option>
              <option value="pequena">Pequena (4 fatias)</option>
            </select>
          </li>
          <li className={styles.item}>
            <p className={styles.itemTitle}>Massa</p>
            <select
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="dough"
              name="dough"
              className={styles.select}
            >
              <option selected="selected" disabled>
                Selecione o tipo da massa
              </option>
              <option value="traditional">Tradicional</option>
              <option value="vegan">Vegana</option>
            </select>
          </li>
          <li className={styles.item}>
            <p className={styles.itemTitle}>Borda</p>
            <select
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="border"
              name="border"
              className={styles.select}
            >
              <option selected="selected" disabled>
                Selecione a borda
              </option>
              <option value="1">Borda de requeijão</option>
              <option value="2">Borda de cheddar</option>
              <option value="3">Borda de chocolate</option>
              <option value="4">Sem borda</option>
            </select>
          </li>
        </ul>
        {formik.errors.size ||
        formik.errors.dough ||
        formik.errors.border ? (
          <InfoError>
            Selecione: {formik.errors.size} {formik.errors.dough}{" "}
            {formik.errors.border}
          </InfoError>
        ) : (
          ""
        )}

        <button type="button" onClick={formik.handleSubmit}>
          Proximo passo
        </button>
      </Form>
    </Container>
  );
}

export default Step1;
