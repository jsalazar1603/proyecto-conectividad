import express from 'express'
import cors from 'cors'
import db from './database/db.js'
import userRoutes from './routes/routes.js'
import proveedorRoutes from './routes/proveedorRoutes.js'

const app=express();
// Configuración del middleware y conexión a la base de datos...

app.use(cors());
app.use(express.json());

// conexion a la base de datos
try {
    await db.authenticate()
    console.log('Conexion exitosa a la DB')
} catch (error) {
    console.log(`El error de conexion es : ${error}`)
}

//Rutas para usuarios
app.use('/users',userRoutes);

//Rutas para proveedores
app.use('/proveedor',proveedorRoutes);

//Ruta de prueba
app.get('/',(req,res)=>{
   res.send('HOLA MUNDO')
})

// Iniciar el servidor
app.listen(8000,()=>{
    console.log('Server UP running in http://localhost:8000/')
});