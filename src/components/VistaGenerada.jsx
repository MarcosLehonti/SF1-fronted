import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // 👈 para generar el ID único de la sala
import Navbar from "./Navbar";
import "../styles/vista-generada.css";


const VistaGenerada = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formFields, generatedCode, imagePreview } = location.state || {};

  const handleCompartirSala = () => {
    const roomId = uuidv4();
    navigate(`/sala/${roomId}`, {
      state: {
        generatedCode,
      },
    });
  };

  const handleDescargarYRedirigir = () => {
    localStorage.setItem("htmlGenerado", generatedCode);
    navigate("/generar-angular");
  };

  return (
    <>
      <Navbar />
      <div className="vista-container">
        <h2>Formulario generado a partir de la imagen</h2>

        {imagePreview && (
          <>
            <h4>✅ Esto me pasaste:</h4>
            <img className="vista-imagen" src={imagePreview} alt="Bosquejo" />
          </>
        )}

        {formFields && (
          <>
            <div className="formulario-generado">
              <h4>✨ Esto generé a partir de tu dibujo:</h4>
              <form className="form-generado">
                {formFields.map((field, idx) => (
                  <div key={idx} className="form-item">
                    {["input", "email", "password", "tel"].includes(field.type) && (
                      <>
                        <label>{field.label}</label>
                        <input
                          type={field.type === "input" ? "text" : field.type}
                          placeholder={field.label}
                        />
                      </>
                    )}

                    {field.type === "button" && (
                      <button type="submit">{field.label}</button>
                    )}

                    {field.type === "table" && (
                      <table border="1" style={{ marginTop: "10px", width: "100%", textAlign: "center" }}>
                        <thead>
                          <tr>
                            <th>Columna 1</th>
                            <th>Columna 2</th>
                            <th>Columna 3</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Dato 1</td>
                            <td>Dato 2</td>
                            <td>Dato 3</td>
                          </tr>
                          <tr>
                            <td>Dato 4</td>
                            <td>Dato 5</td>
                            <td>Dato 6</td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                  </div>
                ))}
              </form>
            </div>

            <div className="codigo-generado">
              <h4>📄 Código HTML Generado</h4>
              <textarea readOnly value={generatedCode}></textarea>
              <br />

              {/* ✅ BOTÓN MODIFICADO */}
              <button onClick={handleDescargarYRedirigir}>
                Descargar código
              </button>

              {/* 👇 ESTE ES EL NUEVO BOTÓN */}
              <button style={{ marginTop: "10px" }} onClick={handleCompartirSala}>
                🔗 Compartir en Sala
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default VistaGenerada;
