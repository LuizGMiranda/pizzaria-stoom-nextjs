import { useFormik } from "formik";
import * as yup from "yup";
import Router from "next/router";

import styles from "../styles/Home.module.css";

import { useDispatch } from "react-redux";
import { changeName } from "../redux/userSlice";

import HeaderPage from "../components/HeaderPage";
import Form from "../components/Form";
import Container from "../components/Container";
import InfoError from "../components/InfoError";
import Title from "../components/Title";

const validationSchema = yup.object().shape({
  name: yup.string().required("*Informe seu nome"),
});

export default function Home() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      dispatch(changeName(values.name));
      Router.push("/step1");
    },
    validationSchema,
  });

  return (
    <Container>
      <HeaderPage title="Pizzaria Stoom" />

      <main className={styles.main}>
        <Title>Pizzaria Stoom</Title>
        <Form>
          <label htmlFor="name">Qual seu nome?</label>
          <input
            id="name"
            placeholder="Digite seu nome"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && <InfoError>{formik.errors.name}</InfoError>}
          <button type="button" onClick={formik.handleSubmit}>
            Vamos começar
          </button>
        </Form>
      </main>
    </Container>
  );
}
