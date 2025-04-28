import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  // Control de submenús
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [diagramMenuOpen, setDiagramMenuOpen] = useState(false);

  const profileRef = useRef(null);
  const diagramRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
      if (diagramRef.current && !diagramRef.current.contains(event.target)) {
        setDiagramMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul>
          <li><Link to="/home">Inicio</Link></li>

          <li className="profile-dropdown" ref={diagramRef}>
            <span onClick={() => setDiagramMenuOpen(!diagramMenuOpen)}>Diagramas</span>
            {diagramMenuOpen && (
              <ul className="submenu">
                <li><Link to="/diagrams/creatediagram">subir diagrama de clases</Link></li>
                <li><Link to="/diagrams/createimage">subir imagen</Link></li>
                <li><Link to="/diagrams/createlienzo">Crear lienzo</Link></li>
               
              </ul>
            )}
          </li>

          <li className="profile-dropdown" ref={profileRef}>
            <span onClick={() => setProfileMenuOpen(!profileMenuOpen)}>Perfil</span>
            {profileMenuOpen && (
              <ul className="submenu">
                <li><Link to="/profile">Usuario</Link></li>
                <li><Link to="/profile/edit">Cambiar datos</Link></li>
                <li><Link to="/profile/password">Cambiar contraseña</Link></li>
              </ul>
            )}
          </li>

          <li>
            <button onClick={handleLogout} className="logout-button">
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
