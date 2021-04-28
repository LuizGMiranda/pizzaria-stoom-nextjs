import React, { useCallback, useEffect, useState } from "react";
import Router from "next/router";

import { useSelector, useDispatch } from 'react-redux'
import { setFlavors as setFlavorsRedux} from '../redux/userSlice'

import stylesHome from "../styles/Home.module.css";
import { getFlavors } from "../services/order";

import HeaderPage from "../components/HeaderPage";
import Form from "../components/Form";
import Container from "../components/Container";
import InfoError from "../components/InfoError";
import Title from "../components/Title";

function Step2() {
  const dispatch = useDispatch()
  const amountOfFlavors = {
    gigante: 3,
    grande: 2,
    pequena: 1
  }
  const [selectFlovors, setSelectFlovors] = useState([])
  const pizzaSize = useSelector(state => state.user.size)
  const [flavors, setFlavors] = useState([]);
  useEffect(() => {
    async function fetch() {
      const { data } = await getFlavors();
      setFlavors(data);
    }
    fetch();
  }, []);

  const isValid = () => {
    console.log('selectFlovors.length ', selectFlovors.length)
    console.log('amountOfFlavors[pizzaSize] ', amountOfFlavors[pizzaSize])
    const valid = selectFlovors.length  === amountOfFlavors[pizzaSize]
    return valid
  }

  const handleCheckbox = useCallback(async(id) =>  {
    const isCheck = await document.getElementById(`ck-${id}`).checked

    if(isCheck){
      const selectFlavor = flavors.find(element => element.id === id);
      const newSelectsFlovors = Array.from(new Set([...selectFlovors, selectFlavor]));
      setSelectFlovors(newSelectsFlovors);
    } else {
      const removeFlavor = selectFlovors.length ? selectFlovors.filter(element => element.id !== id) : [];
      setSelectFlovors(removeFlavor);
    }
  }, [flavors, selectFlovors])

  function handleSubmit() {
    console.log(selectFlovors)
    dispatch(setFlavorsRedux(selectFlovors))
    Router.push("/finish");
  }

  return (
    <Container>
      <HeaderPage title="Pizzaria Stoom - Passo 02" />
      <Title>Passo 2</Title>
      <p>
        Iremos escolher os sabores.<br/>
        Escolha {amountOfFlavors[pizzaSize]} sabores:
      </p>
      <Form>
        <ul>
          {flavors.length &&
            flavors.map((flavor) => (
              <li>
                {
                  flavor.recommended && <span>⭐</span>
                }
                <input id={`ck-${flavor.id}`} type="checkbox" onChange={() => handleCheckbox(flavor.id)} />
                {flavor.title} <pequena>- {flavor.description}</pequena>{" "}
                <span>R$ {flavor.value}</span>
              </li>
            ))}
        </ul>

              {
                !isValid() && <InfoError>Selecione apenas {amountOfFlavors[pizzaSize]} sabor(es)</InfoError>
              }
                  <button type="button" disabled={!isValid()} onClick={handleSubmit}>
                    Proximo passo
                  </button>
      </Form>
    </Container>
  );
}

export default Step2;
