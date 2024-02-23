import "./App.css";
import IniciarSesion from "./pages/IniciarSesion";
import GestionarUsuario from "./pages/GestionarUsuario";
import RegistrarUsuario from "./pages/RegistrarUsuario";
import ModificarUsuario from "./pages/ModificarUsuario";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import ModificarDatos from "./pages/ModificarDatos";
import GestionarProveedor from "./pages/GestionarProveedor";
import RegistrarProveedor from "./pages/RegistrarProveedor";
import ModificarProveedor from "./pages/ModificarProveedor";
import ModificarDatosProveedor from "./pages/ModificarDatosProveedor";

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
        <Route path="/gestionarproveedor" element={<GestionarProveedor/>}></Route>
        <Route path="/registrarproveedor" element={<RegistrarProveedor/>}></Route>
        <Route path="/modificarproveedor" element={<ModificarProveedor/>}></Route>
        <Route path="/modificardatosproveedor/:id" element={<ModificarDatosProveedor/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
