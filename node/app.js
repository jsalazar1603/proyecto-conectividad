import express from 'express'
import cors from 'cors'
import db from './database/db.js'
import userRoutes from './routes/routes.js'
import proveedorRoutes from './routes/proveedorRoutes.js'


const app=express()
app.use(cors())
app.use(express.json())
app.use('/users',userRoutes)

try {
    await db.authenticate()
    console.log('Conexion exitosa a la DB')
} catch (error) {
    console.log(`El error de conexion es : ${error}`)
}
app.get('/',(req,res)=>{
   res.send('HOLA MUNDO')
})

app.use('/proveedor',proveedorRoutes);

app.listen(8000,()=>{
    console.log('Server UP running in http://localhost:8000/')
})