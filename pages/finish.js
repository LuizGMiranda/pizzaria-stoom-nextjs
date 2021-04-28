import React, { useState } from "react";
import Router from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { cleanState } from "../redux/userSlice";

import styles from "../styles/Finish.module.css";
import { sendOrder } from "../services/order";

import HeaderPage from "../components/HeaderPage";
import Form from "../components/Form";
import Modal from "../components/Modal";
import Container from "../components/Container";
import Title from "../components/Title";

const amountOfFlavors = {
  gigante: 25,
  grande: 20,
  pequena: 15,
};

const borderType = {
  1:'borda de requeijão',
  2:'borda de cheddar',
  3:'borda de chocolate',
  4:'sem borda',
};

function Finish() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const [orderNumber, setOrderNumber] = useState();
  const [pointsNumber, setPointsNumber] = useState();
  const [showModal, setShowModal] = useState(false);
  const totalPay =
    user.flavors.reduce((count, el) => count + parseFloat(el.value), 0.0) +
    amountOfFlavors[user.size];
  const recommended = user.flavors.some((el) => el.recommended === true);

  async function handleSubmit() {
    const data = { ...user, recommended };
    const { order, points } = await sendOrder(data);
    console.log("handleSubmit", order);
    setOrderNumber(order);
    setPointsNumber(points);
    setShowModal(true);
  }

  function handleClose() {
    dispatch(cleanState());
    setShowModal(false);
    Router.push("/");
  }

  return (
    <Container>
      <HeaderPage title="Pizzaria Stoom - Final" />
      <Title>Confirmar pedido</Title>
      <div className={styles.containerOrder}>
        {recommended && <p>Ten pizza recomendada:</p>}
        <Form>
          <p className={styles.item}>
            Nome: <strong>{user.name}</strong>
          </p>
          <p className={styles.item}>
            Tamanho da pizza: <strong>{user.size}</strong>
          </p>
          <p className={styles.item}>
            Massa: <strong>{user.dough}</strong>
          </p>
          <p className={styles.item}>
            Borda: <strong>{borderType[user.border]}</strong>
          </p>
          <p className={styles.item}>
            Sabores:
            <ul>
              {user.flavors.map((flovor) => (
                <li>{flovor.title}</li>
              ))}
            </ul>
          </p>
          <p>
            Total:{" "}
            <strong>
              <small>R$</small>
              {totalPay}
            </strong>
          </p>
          <button type="button" onClick={handleSubmit}>
            Confirmar pedido
          </button>
        </Form>
      </div>
      <Modal
        show={showModal}
        title="Pedido efetuado!"
        description={`Seu pedido é o #${orderNumber}${
          recommended ? ` , essa compra gerou ${pointsNumber} pontos` : ""
        }`}
        onClose={handleClose}
      />
    </Container>
  );
}

export default Finish;
