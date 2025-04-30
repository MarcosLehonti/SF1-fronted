import React from 'react';
import '../styles/Manual.css';
import creacionProyectoImg from '../assets/opcionesproyecto.jpg';
import usoLienzoImg from '../assets/uso-lienzo.jpg'; 

import configuracionSalaImg from '../assets/configuracionsala.jpg'; 
import angularImg from '../assets/angular.jpg'; 



const Manual = () => {
    return (
      <div className="manual-container">
        <h1 className="title">📘 Manual del Usuario</h1>
  
        {/* Sección 1 */}
        <section className="manual-section">
          <img src={creacionProyectoImg} alt="Creación de Proyecto" className="section-image" />
          <h2 className="section-title">1️⃣ Creación de Proyecto</h2>
          <p className="section-description">
            Para comenzar, puedes crear un nuevo proyecto de tres maneras:
          </p>
  
          <div className="options-container">
            <div className="option-card">
              <h3>📥 Subir diagrama UML</h3>
              <p>Selecciona un archivo UML para generar el proyecto automáticamente.</p>
            </div>
            <div className="option-card">
              <h3>🖼️ Subir una imagen</h3>
              <p>Sube una imagen con tu diseño o boceto. El sistema lo interpretará visualmente.</p>
            </div>
            <div className="option-card">
              <h3>🎨 Crear un lienzo vacío</h3>
              <p>Comienza desde cero arrastrando y soltando componentes visuales.</p>
            </div>
          </div>
        </section>
  
        {/* Sección 2 */}
        <section className="manual-section">
          <img src={usoLienzoImg} alt="Uso del Lienzo" className="section-image" />
          <h2 className="section-title">2️⃣ Cómo usar el lienzo</h2>
          <p className="section-description">
            Para la parte del lienzo tenemos tres áreas:
          </p>
  
          <div className="option-card">
            <ul>
              <li>
                Parte Izquierda: aquí se encuentran los componentes. Presiona uno para su creación. También podrás eliminarlos o editarlos.
              </li>
              <li>
               Parte Central:  en esta área se visualizan los componentes que arrastres o crees.
              </li>
              <li>
               Parte Derecha: se genera el código HTML basado en los componentes del lienzo.
              </li>
            </ul>
          </div>
        </section>


        {/* Sección 3: Configuración de la sala */}
        <section className="manual-section">
        <img
            src={configuracionSalaImg}
            alt="Configuración de la sala"
            className="section-image"
        />
        <h2 className="section-title">3️⃣ Configuración de la sala</h2>
        <p className="section-description">
            En esta vista podrás copiar el enlace de la sala para compartir con otros usuarios y así permitir la colaboración en tiempo real.
        </p>

        <div className="option-card">
            <ul>
            <li>
                Copiar enlace: comparte el link único de la sala con otros usuarios para que se unan.
            </li>
            <li>
                Nombre de la sala: puedes asignar un nombre identificativo a tu sala colaborativa.
            </li>
            <li>
                Descripción: añade un texto que explique de qué trata la sala o su propósito.
            </li>
            </ul>
        </div>
        </section>




        {/* Sección 4: Generar proyecto Angular y descargar */}
        <section className="manual-section">
        <img
            src={angularImg}
            alt="Generar proyecto Angular"
            className="section-image"
        />
        <h2 className="section-title">4️⃣ Generar tu proyecto Angular y descargar</h2>
        <p className="section-description">
            Puedes descargar la vista que hiciste en un proyecto Angular. Solo descárgala y ejecútala en tu entorno de trabajo.
        </p>

        <div className="option-card">
            <ul>
            <li>
              Descargar: al generar el código, se descarga automáticamente en un archivo comprimido (.zip).
            </li>
            <li>
              Ejecutar: descomprime el proyecto y ábrelo con tu editor favorito (Visual Studio Code, por ejemplo).
            </li>
            <li>
              Instalar dependencias: abre la terminal en el proyecto y ejecuta <code>npm i</code> para instalar todas las dependencias necesarias.
            </li>
            <li>
              Listo: ahora puedes iniciar tu app con <code>ng serve</code> si tienes Angular CLI instalado.
            </li>
            </ul>
        </div>
        </section>


      </div>
    );
  };
  
  export default Manual;