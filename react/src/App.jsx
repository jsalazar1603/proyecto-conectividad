import "./App.css";
import IniciarSesion from "./pages/IniciarSesion";
import GestionarUsuario from "./pages/GestionarUsuario";
import RegistrarUsuario from "./pages/RegistrarUsuario";
import ModificarUsuario from "./pages/ModificarUsuario";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ModificarDatos from "./pages/ModificarDatos";
import GestionarProveedor from "./pages/GestionarProveedor";
import RegistrarProveedor from "./pages/RegistrarProveedor";
import ModificarProveedor from "./pages/ModificarProveedor";
import ModificarDatosProveedor from "./pages/ModificarDatosProveedor";
import GestionarProducto from "./pages/GestionarProducto";
import RegistrarProducto from "./pages/RegistrarProducto";
import ModificarProducto from "./pages/ModificarProducto";
import ModificarDatosProducto from './pages/ModificarDatosProducto'
import GestionarPedido from "./pages/GestionarPedido";
import RegistrarPedido from "./pages/RegistrarPedido";
import ModificarPedido from "./pages/ModificarPedido";
import ModificarDatosPedido from "./pages/ModificarDatosPedido";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IniciarSesion />}></Route>
        <Route path="/iniciarsesion" element={<IniciarSesion />}></Route>
        <Route path="/gestionarusuario" element={<GestionarUsuario />}></Route>
        <Route path="/registrarusuario" element={<RegistrarUsuario />}></Route>
        <Route path="/modificarusuario" element={<ModificarUsuario/>}></Route>
        <Route path="/modificardatos/:id" element={<ModificarDatos />}></Route>
        <Route path="/gestionarproveedor" element={<GestionarProveedor />}></Route>
        <Route path="/registrarproveedor" element={<RegistrarProveedor />}></Route>
        <Route path="/modificarproveedor" element={<ModificarProveedor />}></Route>
        <Route path="/modificardatosproveedor/:id" element={<ModificarDatosProveedor />}></Route>
        <Route path="/gestionarproducto" element={<GestionarProducto />}></Route>
        <Route path="/registrarproducto" element={<RegistrarProducto />}></Route>
        <Route path="/modificarproducto" element={<ModificarProducto/>}></Route>
        <Route path="/modificardatosproducto/:id" element={<ModificarDatosProducto/>}></Route>
        <Route path="/gestionarpedido" element={<GestionarPedido/>}></Route>
        <Route path="/registrarpedido" element={<RegistrarPedido/>}></Route>
        <Route path="/modificarpedido" element={<ModificarPedido/>}></Route>
        <Route path="/modificardatospedido/:id" element={<ModificarDatosPedido/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
