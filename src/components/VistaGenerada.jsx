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
                    {field.type === "input" && (
                      <>
                        <label>{field.label}</label>
                        <input type="text" placeholder={field.label} />
                      </>
                    )}
                    {field.type === "button" && (
                      <button type="submit">{field.label}</button>
                    )}
                  </div>
                ))}
              </form>
            </div>

            <div className="codigo-generado">
              <h4>📄 Código HTML Generado</h4>
              <textarea readOnly value={generatedCode}></textarea>
              <br />
              <a
                href={`data:text/html;charset=utf-8,${encodeURIComponent(generatedCode)}`}
                download="formulario-generado.html"
              >
                <button>Descargar código</button>
              </a>

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
