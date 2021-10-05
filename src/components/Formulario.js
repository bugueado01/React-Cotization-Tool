import React, { useState } from 'react'
import styled from '@emotion/styled';
import { obtenerDiferenciaYear, calcularMarca, obtenerPlan } from '../helper';
import PropTypes from 'prop-types'

const Campo = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;

const Label = styled.label`
  flex: 0 0 100px;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  -webkit-appearance: none;
`;

const InputRadio = styled.input`
  margin: 0 1rem;
`;

const Boton = styled.button`
  background-color: #00838f;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  transition: background-color .3s ease;
  margin-top: 2rem;

  &:hover{
    background-color: #26c6da;
    cursor: pointer;
  }
`;

const Error = styled.div`
  background-color: red;
  color: white;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`


const Formulario = ({setResumen, setLoading}) => {

  const [datos, setDatos] = useState({
    marca: "",
    year: "",
    plan: ""
  })

  //extraer los valores del state

  const { marca, year, plan } = datos;

  const [error, setError] = useState(false)


  // Leer los datos del formulario y colocarlos en el state

  const obtenerInfo = e => {
    setDatos({
      ...datos,
    [e.target.name]: e.target.value
    })
  }


  // CUando el usuario presiona submit

  const cotizarSeguro = e => {
    e.preventDefault()

    if(marca.trim() === "" || year.trim() === "" || plan.trim() === ""){
      setError(true)
      return
    }

    setError(false)

    // UNa base de 2000
    let resultado = 2000;

    // Obtener la diferencia de anos

    const diferencia = obtenerDiferenciaYear(year);

    console.log(diferencia);

    // por cada ano hay que restar el 3%

    resultado -= (( diferencia * 3 ) * resultado) / 100

    // console.log(resultado);

    // Americano15
    // Asiatico 5%
    // Europeo 30
    resultado = calcularMarca(marca) * resultado

    console.log(resultado);

    // Basico aumento 20%
    // Completo 50%

    const incrementoPlan = obtenerPlan(plan);
    resultado = parseFloat( incrementoPlan * resultado ).toFixed(2);
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
      // Total
    setResumen({
      cotizacion: Number(resultado),
      datos
    })
    }, 3000)

    console.log(resultado);

    // console.log(incrementoPlan);

    
  }
  return (
    <form
      onSubmit={cotizarSeguro}
    >

      {
        error ? (<Error>Todos los campos son obligatorios</Error>) : null
      }
      <Campo>
        <Label htmlFor="">Marca</Label>
        <Select name="marca" id="" value="marca" onChange={obtenerInfo}>
          <option value="">-- Seleccione --</option>
          <option value="americano">Americano</option>
          <option value="europeo">Europeo</option>
          <option value="asiatico">Asiatico</option>
        </Select>
      </Campo>

      <Campo>
        <Label htmlFor="">Año</Label>
        <Select name="year" id="" value="year" onChange={obtenerInfo}>
          <option value="">-- Seleccione --</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
        </Select>
      </Campo>

      <Campo>
        <Label htmlFor="">Plan</Label>
        <InputRadio type="radio" name="plan" value="basico" id="" checked={plan === "basico"} onChange={obtenerInfo}/> Basico
        <InputRadio type="radio" name="plan" value="completo" id="" checked={plan === "completo"} onChange={obtenerInfo}/> Completo
      </Campo>

      <Boton type="submit">
          Cotizar
      </Boton>
    </form>
  )
} 

Formulario.propTypes = {
  setResumen: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired
}

export default Formulario