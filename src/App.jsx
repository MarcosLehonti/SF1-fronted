
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from '../src/components/Register';
import Login from '../src/components/Login';
import Home from './components/Home';
import EditProfile from './components/EditProfile';
import ChangePassword from './components/ChangedPassword';
import StartProjectView from './components/StartProjectView';
import VistaGenerada from './components/VistaGenerada';
import SalaColaborativa from './components/SalaColaborativa';
import Prueba from './components/prueba';
import VisorDiagramas from './components/VisorDiagramas';
import GenerarAngular from './components/GenerarAngular';
import ListaUsuarios from './components/ListUser';
import ConfigurarSala from './components/ConfigurarSala';
import LogsView from './components/LogsView';
import GuardarProyecto from './components/GuardarProyecto';
import MisProyectos from './components/MisProyectos';
import Manual from './components/Manual';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/profile/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
      <Route path="/profile/password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
      <Route path="/diagrams/view" element={<ProtectedRoute><StartProjectView /></ProtectedRoute>} />
      <Route path="/vista-generada" element={<ProtectedRoute><VistaGenerada /></ProtectedRoute>} />
      <Route path="/sala/:roomId" element={<ProtectedRoute><SalaColaborativa /></ProtectedRoute>} />
      <Route path="/diagrams/createlienzo" element={<ProtectedRoute><Prueba /></ProtectedRoute>} />
      <Route path="/diagrams/createlienzo/:roomId" element={<ProtectedRoute><Prueba /></ProtectedRoute>} />
      <Route path="/diagrams/createimage" element={<ProtectedRoute><StartProjectView /></ProtectedRoute>} />
      <Route path="/diagrams/creatediagram" element={<ProtectedRoute><VisorDiagramas /></ProtectedRoute>} />
      <Route path="/generar-angular" element={<ProtectedRoute><GenerarAngular /></ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute><ListaUsuarios /></ProtectedRoute>} />
      <Route path="/diagrams/configurar-sala/:roomId" element={<ProtectedRoute><ConfigurarSala /></ProtectedRoute>} />
      <Route path="/logs" element={<ProtectedRoute><LogsView /></ProtectedRoute>} />
      <Route path="/guardar-proyecto" element={<ProtectedRoute><GuardarProyecto /></ProtectedRoute>} />
      <Route path="/diagrams/mis-proyectos" element={<ProtectedRoute><MisProyectos /></ProtectedRoute>} />
      <Route path="/manual" element={<ProtectedRoute><Manual /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;


// import React from 'react';
// import GrapesJSComponent from './components/GrapesJSComponent'; // Importar el componente

// function App() {
//   return (
//     <div>
//       <h1>Mi Proyecto con GrapesJS</h1>
//       <GrapesJSComponent /> {/* Aquí se renderiza GrapesJS */}
//     </div>
//   );
// }

// export default App;
