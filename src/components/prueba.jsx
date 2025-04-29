import { useState, useEffect, useRef } from "react";
import { Plus, Type } from "lucide-react";
import Navbar from "./Navbar";
import Boton from "./Boton";
import Label from "./Label";
import "../styles/Lienzo.css";
import { io } from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

export default function CreateLienzo() {
  const [elements, setElements] = useState([]);
  const [draggedId, setDraggedId] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [selectedElementId, setSelectedElementId] = useState(null);
  const socketRef = useRef();   // 👈 Cambio aquí
  const { roomId } = useParams();
  const navigate = useNavigate();

  // Funciones de creación
  const handleCreateButton = () => {
    const newButton = {
      id: elements.length + 1,
      type: "button",
      x: 600,
      y: 350,
      text: "Botón",
      color: "#007bff",
    };
    syncElements([...elements, newButton]);
  };

  const handleCreateLabel = () => {
    const newLabel = {
      id: elements.length + 1,
      type: "label",
      x: 600,
      y: 400,
      text: "Etiqueta",
      fontSize: 14,
      width: 100,
      height: 30
    };
    syncElements([...elements, newLabel]);
  };

  const handleCreateInput = () => {
    const newInput = {
      id: elements.length + 1,
      type: "input",
      x: 600,
      y: 450,
      text: "Ingrese Texto",
    };
    syncElements([...elements, newInput]);
  };

  const handleCreateCard = () => {
    const newCard = {
      id: elements.length + 1,
      type: "card",
      x: 400,
      y: 100,
      width: 500,
      height: 550,
      backgroundColor: "#90bdc6",
      text: ""
    };
    syncElements([...elements, newCard]);
  };

  // Movimiento
  const handleMouseDown = (id) => (e) => {
    setDraggedId(id);
    const el = elements.find((el) => el.id === id);
    const offsetX = e.clientX - el.x;
    const offsetY = e.clientY - el.y;
    setOffset({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = (e) => {
    if (draggedId) {
      const updated = elements.map((el) =>
        el.id === draggedId
          ? { ...el, x: e.clientX - offset.x, y: e.clientY - offset.y }
          : el
      );
      syncElements(updated);
    }
  };

  const handleMouseUp = () => {
    setDraggedId(null);
  };

  // Eliminar
  const handleDelete = (id) => {
    syncElements(elements.filter((el) => el.id !== id));
    setSelectedElementId(null);
  };

  const handleElementClick = (id) => {
    setSelectedElementId(id);
  };

  // Editar elementos (label, button, card)
  const handleEditLabel = (id, newText) => {
    const updated = elements.map((el) =>
      el.id === id ? { ...el, text: newText } : el
    );
    syncElements(updated);
  };

  const handleEditLabelSize = (id, field, value) => {
    const updated = elements.map((el) =>
      el.id === id ? { ...el, [field]: parseInt(value) } : el
    );
    syncElements(updated);
  };

  const handleEditButtonText = (id, newText) => {
    const updated = elements.map((el) =>
      el.id === id ? { ...el, text: newText } : el
    );
    syncElements(updated);
  };

  const handleEditButtonColor = (id, newColor) => {
    const updated = elements.map((el) =>
      el.id === id ? { ...el, color: newColor } : el
    );
    syncElements(updated);
  };

  const handleEditCardColor = (id, newColor) => {
    const updated = elements.map((el) =>
      el.id === id ? { ...el, backgroundColor: newColor } : el
    );
    syncElements(updated);
  };

  const handleSaveLabel = (id) => {
    console.log(`Label ${id} saved`);
  };

  // 🔹 MODIFICADO: syncElements con socketRef
  const syncElements = (newElements) => {
    setElements(newElements);
    socketRef.current.emit('update-elements', { roomid: roomId, elements: newElements });
  };

  // Generar nuevo roomId si no existe
  useEffect(() => {
    if (!roomId) {
      const newRoomId = uuidv4();
      navigate(`/diagrams/createlienzo/${newRoomId}`);
    }
  }, [roomId, navigate]);

  // Manejo del mouse
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });

  // 🔹 MODIFICADO: Conexión socket estable
  useEffect(() => {
    socketRef.current = io('http://localhost:4000');

    if (roomId) {
      socketRef.current.emit('join-room', roomId);
    }

    socketRef.current.on('load-elements', (loadedElements) => {
      setElements(loadedElements);
    });

    socketRef.current.on('receive-elements', (updatedElements) => {
      setElements(updatedElements);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  // Generador de HTML
  const generatedHTML = elements
    .map((el) => {
      if (el.type === "button") {
        return `<button style="position:absolute; left:${el.x}px; top:${el.y}px; background-color:${el.color};">${el.text}</button>`;
      } else if (el.type === "label") {
        return `<label style="position:absolute; left:${el.x}px; top:${el.y}px; font-size:${el.fontSize}px; width:${el.width}px; height:${el.height}px; display:flex; align-items:center; justify-content:center; border:1px dashed gray;">${el.text}</label>`;
      } else if (el.type === "input") {
        return `<input style="position:absolute; left:${el.x}px; top:${el.y}px; padding:4px;" placeholder="${el.text}" />`;
      } else if (el.type === "card") {
        return `<div style="position:absolute; left:${el.x}px; top:${el.y}px; width:${el.width}px; height:${el.height}px; background-color:${el.backgroundColor}; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1); display:flex; align-items:center; justify-content:center;">${el.text}</div>`;
      }
      return "";
    })
    .join("\n");

  useEffect(() => {
    localStorage.setItem("htmlGenerado", generatedHTML);
  }, [generatedHTML]);

  return (
    <>
      <Navbar />
      <div className="contenedor-principal">
        <div className="sidebar">
          <h2 className="sidebar-title">Herramientas</h2>
          <button onClick={handleCreateButton} className="sidebar-button">
            <Plus size={16} /> Crear botón
          </button>
          <button onClick={handleCreateLabel} className="sidebar-button">
            <Type size={16} /> Crear etiqueta
          </button>
          <button onClick={handleCreateInput} className="sidebar-button">
            <Plus size={16} /> Crear input
          </button>
          <button onClick={handleCreateCard} className="sidebar-button">
            <Plus size={16} /> Crear tarjeta
          </button>


          <div className="menu-eliminar">
            <h3>Eliminar elementos</h3>
            <ul>
              {elements.map((el) => (
                <li
                  key={el.id}
                  style={{
                    backgroundColor:
                      el.id === selectedElementId ? "#c1e7ff" : "transparent",
                  }}
                >
                  {el.type === "button" ? `Botón ${el.id}` : `Etiqueta ${el.id}`}
                  <button onClick={() => handleDelete(el.id)}>Eliminar</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="menu-editar">
            <h3>Editar etiquetas</h3>
            <ul>
              {elements
                .filter((el) => el.type === "label")
                .map((el) => (
                  <li key={el.id}>
                    {`Etiqueta ${el.id}`}
                    <input
                      type="text"
                      value={el.text}
                      onChange={(e) => handleEditLabel(el.id, e.target.value)}
                    />
                    <input
                      type="number"
                      value={el.fontSize}
                      min="8"
                      max="72"
                      onChange={(e) => handleEditLabelSize(el.id, "fontSize", e.target.value)}
                      placeholder="Tamaño texto"
                    />
                    <input
                      type="number"
                      value={el.width}
                      min="20"
                      onChange={(e) => handleEditLabelSize(el.id, "width", e.target.value)}
                      placeholder="Ancho"
                    />
                    <input
                      type="number"
                      value={el.height}
                      min="20"
                      onChange={(e) => handleEditLabelSize(el.id, "height", e.target.value)}
                      placeholder="Alto"
                    />
                    <button onClick={() => handleSaveLabel(el.id)}>Guardar</button>
                  </li>
                ))}
            </ul>
          </div>

          <div className="menu-editar-tarjetas">
            <h3>Editar tarjetas</h3>
            <ul>
              {elements
                .filter((el) => el.type === "card")
                .map((el) => (
                  <li key={el.id}>
                    {`Tarjeta ${el.id}`}
                    <input
                      type="color"
                      value={el.backgroundColor}
                      onChange={(e) => handleEditCardColor(el.id, e.target.value)}
                    />
                  </li>
                ))}
            </ul>
          </div>


          <div className="menu-editar-botones">
            <h3>Editar botones</h3>
            <ul>
              {elements
                .filter((el) => el.type === "button")
                .map((el) => (
                  <li key={el.id}>
                    {`Botón ${el.id}`}
                    <input
                      type="text"
                      value={el.text}
                      onChange={(e) => handleEditButtonText(el.id, e.target.value)}
                      placeholder="Texto del botón"
                    />
                    <input
                      type="color"
                      value={el.color}
                      onChange={(e) => handleEditButtonColor(el.id, e.target.value)}
                    />
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="lienzo-contenedor">
          <div className="lienzo">
            <h2>🧪 Lienzo de prueba</h2>
            {elements.map((el) => {
              if (el.type === "button") {
                return (
                  <Boton
                    key={el.id}
                    id={el.id}
                    x={el.x}
                    y={el.y}
                    text={el.text}
                    color={el.color}
                    onMouseDown={handleMouseDown}
                    onClick={() => handleElementClick(el.id)}
                    isSelected={el.id === selectedElementId}
                  />
                );
              } else if (el.type === "label") {
                return (
                  <Label
                    key={el.id}
                    id={el.id}
                    x={el.x}
                    y={el.y}
                    text={el.text}
                    fontSize={el.fontSize}
                    width={el.width}
                    height={el.height}
                    onMouseDown={handleMouseDown}
                    onClick={() => handleElementClick(el.id)}
                    isSelected={el.id === selectedElementId}
                  />
                );
              } else if (el.type === "input") {
                return (
                  <input
                    key={el.id}
                    style={{
                      position: "absolute",
                      left: el.x,
                      top: el.y,
                      border: el.id === selectedElementId ? "2px solid blue" : "1px solid #ccc",
                      padding: "4px",
                    }}
                    placeholder={el.text}
                    onMouseDown={handleMouseDown(el.id)}
                    onClick={() => handleElementClick(el.id)}
                  />
                );
              } else if (el.type === "card") {
                return (
                  <div
                    key={el.id}
                    style={{
                      position: "absolute",
                      left: el.x,
                      top: el.y,
                      width: `${el.width}px`,
                      height: `${el.height}px`,
                      backgroundColor: el.backgroundColor,
                      borderRadius: "8px",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "move"
                    }}
                    onMouseDown={handleMouseDown(el.id)}
                    onClick={() => handleElementClick(el.id)}
                  >
                    {el.text}
                  </div>
                );
              }
              
            })}
          </div>
        </div>

        <div className="panel-html">
          <h2>📄 HTML generado</h2>
          <textarea
            className="textarea-html"
            value={generatedHTML}
            readOnly
            rows="10"
            cols="50"
          />
          <button onClick={() => navigate('/generar-angular')}>
            Descargar Vista en Angular
          </button>

          <button onClick={() => navigate('/guardar-proyecto')}>
            Guardar Proyecto
          </button>

        </div>
      </div>
    </>
  );
}
