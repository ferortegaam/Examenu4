import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { RFC } from "./RFC";

export const App = () => {
  // Estados para los datos del formulario y el RFC
  const [paterno, setPaterno] = useState("");
  const [materno, setMaterno] = useState("");
  const [nombre, setNombre] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [rfc, setRfc] = useState("");

  // Función para calcular el RFC
  const calcularRFC = () => {
    const [anio, mes, dia] = fechaNacimiento.split("-");
    const buscaVocal = (cadena) => {
      for (let i = 1; i < cadena.length; i++) {
        if ("AEIOU".includes(cadena[i].toUpperCase())) return cadena[i].toUpperCase();
      }
      return "";
    };
    const letra1 = paterno[0]?.toUpperCase() || "";
    const letra2 = buscaVocal(paterno);
    const letra3 = materno[0]?.toUpperCase() || "";
    const letra4 = nombre[0]?.toUpperCase() || "";

    return `${letra1}${letra2}${letra3}${letra4}${anio.slice(2)}${mes}${dia}`;
  };

  // Manejo del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const resultadoRFC = calcularRFC(); // Calcular el RFC
    setRfc(resultadoRFC); // Actualizar el estado del RFC
  };

  return (
    <div className="container d-flex justify-content-center align-items-center custom-container">
      <div className="row justify-content-center align-items-center w-100">
        <div className="col-md-6 col-lg-4">
          <div className="card custom-card">
            <div className="card-body p-4">
              <h2 className="text-center text-primary mb-4">Calculadora de RFC</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="paterno" className="form-label">Apellido Paterno</label>
                  <input
                    type="text"
                    className="form-control"
                    id="paterno"
                    value={paterno}
                    onChange={(e) => setPaterno(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="materno" className="form-label">Apellido Materno</label>
                  <input
                    type="text"
                    className="form-control"
                    id="materno"
                    value={materno}
                    onChange={(e) => setMaterno(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
                  <input
                    type="date"
                    className="form-control"
                    id="fechaNacimiento"
                    value={fechaNacimiento}
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Calcular RFC</button>
                </div>
              </form>

              {/* Pasar el RFC calculado como prop al componente hijo */}
              {rfc && <RFC rfc={rfc} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
