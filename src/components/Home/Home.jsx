import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../../assets/images/tracol_logo.png";
import { getDatosActa } from "../../service/apiActa/apiActa";
import PopUp from "../PopUp/PopUp";

const Home = () => {
  const [datosUsuario, setDatosUsuario] = useState({
    numeroTRA: null,
    codigoVerificacion: null,
  });

  const [messageError, setMessageError] = useState(null);
  const [datosActa, setDatosActa] = useState(null);
  const { numeroTRAParams, codigoVerificacionParams } = useParams();

  const enviarDatos = async (e) => {
    e.preventDefault();
    if (
      datosUsuario.numeroTRA !== null &&
      datosUsuario.numeroTRA.trim() &&
      datosUsuario.codigoVerificacion !== null &&
      datosUsuario.codigoVerificacion.trim()
    ) {
      const datosObtenidosActa = await getDatosActa(datosUsuario);
      if (datosObtenidosActa.mensaje) {
        setMessageError(datosObtenidosActa.mensaje);
        setTimeout(() => {
          setMessageError(null);
        }, 3000);
        setDatosActa(null);
      } else {
        setDatosActa(await datosObtenidosActa);
      }
    } else {
      setMessageError("Los campos son obligarios");
      setTimeout(() => {
        setMessageError(null);
      }, 3000);
    }
  };

  useEffect(() => {
    if (
      datosUsuario.numeroTRA !== null &&
      numeroTRAParams !== undefined &&
      datosUsuario.codigoVerificacion !== null &&
      codigoVerificacionParams !== undefined
    ) {
      const enviarDatos = async () => {
        console.log(datosUsuario);

        const datosObtenidosActa = await getDatosActa(datosUsuario);
        console.log(datosObtenidosActa);
        if (datosObtenidosActa.mensaje) {
          setMessageError(datosObtenidosActa.mensaje);
          setTimeout(() => {
            setMessageError(null);
          }, 3000);
          setDatosActa(null);
        } else {
          setDatosActa(await datosObtenidosActa);
        }
      };

      enviarDatos();
    }
  }, [datosUsuario]);

  useEffect(() => {
    if (
      numeroTRAParams !== null &&
      codigoVerificacionParams !== null &&
      numeroTRAParams !== undefined &&
      codigoVerificacionParams !== undefined
    ) {
      setDatosUsuario({
        ...datosUsuario,
        codigoVerificacion: codigoVerificacionParams,
        numeroTRA: numeroTRAParams,
      });
    }
  }, [numeroTRAParams, codigoVerificacionParams]);

  const guardarDatos = (e) => {
    setDatosUsuario({
      ...datosUsuario,
      [e.target.name]: e.target.value,
    });
  };

  const fecha = new Date();
  return (
    <div className="contenedor-home">
      {messageError ? <h1 className="message-error">{messageError}</h1> : null}
      <img className="home__logo" src={logo} alt="logo"></img>
      <h1 className="home__title">Verificaci??n de actas</h1>
      <form onSubmit={enviarDatos} className="home__form">
        <div className="home__form-div-input">
          <label className="home__form-label">N??mero de TRA</label>
          <input
            className="home__form-input"
            name="numeroTRA"
            onChange={guardarDatos}
          ></input>
        </div>
        <div className="home__form-div-input">
          <label className="home__form-label">C??digo de verificaci??n</label>
          <input
            className="home__form-input"
            type="password"
            name="codigoVerificacion"
            onChange={guardarDatos}
          ></input>
        </div>
        <button className="home__form-button" type="submit">
          Validar
        </button>
      </form>
      {datosActa ? (
        <>
          <PopUp datosActa={datosActa} />
        </>
      ) : // <table border="1" className="table-result">
      //   <tbody>
      //     <tr className="table-result__tr">
      //       <th>Solicitud</th>
      //       <td className="table-result__td">
      //         {datosActa[0].Collection_Order}
      //       </td>
      //     </tr>
      //     <tr className="table-result__tr">
      //       <th>Fecha</th>
      //       <td className="table-result__td">
      //         {datosActa[0].Collection_Date.substr(0, 10)}
      //       </td>
      //     </tr>
      //     <tr className="table-result__tr">
      //       <th>Cliente</th>
      //       <td className="table-result__td">{datosActa[0].Company_Name}</td>
      //     </tr>
      //     <tr className="table-result__tr">
      //       <th>Sede</th>
      //       <td className="table-result__td">
      //         {datosActa[0].Company_Address}
      //       </td>
      //     </tr>
      //     <tr className="table-result__tr">
      //       <th>Fecha y hora verificaci??n</th>
      //       <td className="table-result__td">
      //         {fecha.getDate()}/{fecha.getMonth() + 1}/{fecha.getFullYear()}{" "}
      //         {fecha.getHours()}:{fecha.getMinutes()}:{fecha.getSeconds()}
      //       </td>
      //     </tr>
      //   </tbody>
      // </table>
      null}
    </div>
  );
};

export default Home;
