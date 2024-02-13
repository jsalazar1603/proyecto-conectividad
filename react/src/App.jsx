import "./App.css";
import IniciarSesion from "./pages/IniciarSesion";
import GestionarUsuario from "./pages/GestionarUsuario";
import RegistrarUsuario from "./pages/RegistrarUsuario";
import ModificarUsuario from "./pages/ModificarUsuario";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ModificarDatos from "./pages/ModificarDatos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IniciarSesion/>}></Route>
        <Route path="/iniciarsesion" element={<IniciarSesion/>}></Route>
        <Route path="/gestionarusuario" element={<GestionarUsuario/>}></Route>
        <Route path="/registrarusuario" element={<RegistrarUsuario/>}></Route>
        <Route path="/modificarusuario" element={<ModificarUsuario/>}></Route>
        <Route path="/modificardatos/:id" element={<ModificarDatos/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
