

// import React, { useState } from "react";
// import Tesseract from "tesseract.js";

// const ImageToFormView = () => {
//   const [formFields, setFormFields] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [generatedCode, setGeneratedCode] = useState("");
//   const [imagePreview, setImagePreview] = useState(null);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setImagePreview(URL.createObjectURL(file));
//     setLoading(true);

//     Tesseract.recognize(file, 'eng', { logger: m => console.log(m) })
//       .then(({ data: { text } }) => {
//         const lines = text.split("\n").map(l => l.trim()).filter(Boolean);

//         const elements = lines.map((line) => {
//           if (line.toLowerCase().includes("enviar") || line.toLowerCase().includes("submit")) {
//             return { type: "button", label: line };
//           } else {
//             return { type: "input", label: line };
//           }
//         });

//         setFormFields(elements);
//         generateHTMLCode(elements);
//         setLoading(false);
//       });
//   };

//   const generateHTMLCode = (fields) => {
//     const code = `
// <form>
//   ${fields.map(field => {
//     if (field.type === "input") {
//       return `  <label>${field.label}</label>\n  <input type="text" name="${field.label}" />`;
//     } else if (field.type === "button") {
//       return `  <button type="submit">${field.label}</button>`;
//     }
//     return "";
//   }).join("\n")}
// </form>
//     `.trim();

//     setGeneratedCode(code);
//   };

//   const downloadCode = () => {
//     const blob = new Blob([generatedCode], { type: "text/html" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "formulario-generado.html";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div style={{ textAlign: "center" }}>
//       <h3>Sube tu imagen dibujada</h3>
//       <input type="file" accept="image/*" onChange={handleImageUpload} />
//       {loading && <p>Procesando imagen...</p>}

//       {imagePreview && (
//         <>
//           <h4>🖼️ Esto me pasaste:</h4>
//           <img
//             src={imagePreview}
//             alt="Bosquejo"
//             style={{ maxWidth: "400px", marginTop: "20px", border: "1px solid #ccc" }}
//           />
//         </>
//       )}

//       {formFields.length > 0 && (
//         <div style={{ marginTop: "40px" }}>
//           <h4>✨ Esto generé a partir de tu dibujo:</h4>
//           <form style={{ textAlign: "left", display: "inline-block" }}>
//             {formFields.map((field, idx) => (
//               <div key={idx} style={{ marginBottom: "10px" }}>
//                 {field.type === "input" && (
//                   <>
//                     <label>{field.label}</label>
//                     <input type="text" placeholder={field.label} />
//                   </>
//                 )}
//                 {field.type === "button" && (
//                   <button type="submit">{field.label}</button>
//                 )}
//               </div>
//             ))}
//           </form>

//           <div style={{ marginTop: "30px" }}>
//             <h4>📄 Código HTML Generado</h4>
//             <textarea
//               style={{ width: "80%", height: "200px" }}
//               readOnly
//               value={generatedCode}
//             ></textarea>
//             <br />
//             <button onClick={downloadCode} style={{ marginTop: "10px" }}>
//               Descargar código
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


import React, { useState } from "react";
import Tesseract from "tesseract.js";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const ImageToFormView = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setLoading(true);

    Tesseract.recognize(file, 'eng', { logger: m => console.log(m) })
      .then(({ data: { text } }) => {
        const lines = text.split("\n").map(l => l.trim()).filter(Boolean);

        // ✅ Reconocimiento mejorado con "tabla"
        const elements = lines.map((line) => {
          const lower = line.toLowerCase();

          const isButton = ["enviar", "submit", "registrar", "aceptar", "guardar", "buscar", "cancelar"]
            .some(word => lower.includes(word));
          if (isButton) {
            return { type: "button", label: line };
          }

          if (lower.includes("correo") || lower.includes("email")) {
            return { type: "email", label: line };
          }
          if (lower.includes("contraseña") || lower.includes("password")) {
            return { type: "password", label: line };
          }
          if (lower.includes("teléfono") || lower.includes("telefono") || lower.includes("celular")) {
            return { type: "tel", label: line };
          }
          if (lower.includes("tabla")) {
            return { type: "table", label: line };
          }

          return { type: "input", label: line };
        });

        // ✅ Generación de HTML con tabla incluida
        const code = `
<form>
  ${elements.map(field => {
    if (field.type === "input") {
      return '  <label>' + field.label + '</label>\n  <input type="text" name="' + field.label + '" />';
    } else if (field.type === "email") {
      return '  <label>' + field.label + '</label>\n  <input type="email" name="' + field.label + '" />';
    } else if (field.type === "password") {
      return '  <label>' + field.label + '</label>\n  <input type="password" name="' + field.label + '" />';
    } else if (field.type === "tel") {
      return '  <label>' + field.label + '</label>\n  <input type="tel" name="' + field.label + '" />';
    } else if (field.type === "table") {
      return (
        '  <table border="1">\n' +
        '    <thead>\n' +
        '      <tr><th>Columna 1</th><th>Columna 2</th><th>Columna 3</th></tr>\n' +
        '    </thead>\n' +
        '    <tbody>\n' +
        '      <tr><td>Dato 1</td><td>Dato 2</td><td>Dato 3</td></tr>\n' +
        '      <tr><td>Dato 4</td><td>Dato 5</td><td>Dato 6</td></tr>\n' +
        '      <tr><td>Dato 7</td><td>Dato 8</td><td>Dato 9</td></tr>\n' +
        '    </tbody>\n' +
        '  </table>'
      );
    } else if (field.type === "button") {
      return '  <button type="submit">' + field.label + '</button>';
    }
    return "";
  }).join("\n")}
</form>
        `.trim();

        // Redirigir a la nueva vista con datos
        navigate("/vista-generada", {
          state: {
            formFields: elements,
            generatedCode: code,
            imagePreview: preview
          }
        });

        setLoading(false);
      });
  };

  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center" }}>
        <h3>Sube tu imagen dibujada</h3>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {loading && <p>Procesando imagen...</p>}
      </div>
    </>
  );
};

export default ImageToFormView;
