import ProductoModel from "../models/ProductoModel.js";

// Mostrar todos los productos
export const getAllProductos = async (req, res) => {
    try {
        const productos = await ProductoModel.findAll();
        res.json(productos);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Mostrar un producto por su id
export const getProducto = async (req, res) => {
    try {
        const producto = await ProductoModel.findAll({
            where: {
                id: req.params.id
            }
        })
        res.json(producto[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Crear un registro de producto validado por nombre
export const createProducto= async (req, res)=>{
    try{
        const nombre=await ProductoModel.findOne({
            where:{
               nombre:req.body.nombre
            }
        })
        if(!nombre){
            await ProductoModel.create(req.body);
            return res.json({message:"Registro creado exitosamente"});
        }else{
            return res.json({message:"El producto ya existe"});
        }
    }catch(error){
        res.json({message:"error al conectar con la base de datos"});
    }
}

// Actualizar datos de un prroducto
export const updateProducto = async (req, res) => {
    try {
        await ProductoModel.update(req.body, {
            where: { id: req.params.id }
        });
        res.json({ message: "Registro actualizado exitosamente" });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Actualizar datos de un producto validado por nombre .... Genera error ya que no me permite actualiar porque me dice que el nombre del producto ya existe
export const updateProductoValNom = async (req, res) => {
    try {
        const nombre = await ProductoModel.findOne({ 
            where: {
                nombre: req.body.nombre
            }
        })
        if (!nombre) {
            await ProductoModel.update(req.body, {
                where: { id: req.params.id }
            });
            res.json({ message: "Registro actualizado exitosamente" });
        } else {
            res.json({ message: "El producto ya existe" });
        }
    } catch (error) {
        res.json({ message: "error al conectar con la base de datos" });
    }
}

//Activar producto por estado
export const activateProducto = async (req, res) => {
    try {
        await ProductoModel.update({estado:true},{
            where: { id: req.params.id }
        });
        res.json({ message: "Registro actualizado correctamente." });
    } catch (error) {
        res.json({ message: error.message });
    }
}

//Desactivar producto por estado
export const deactivateProducto = async (req, res) => {
    try {
        await ProductoModel.update({estado:false},{
            where: { id: req.params.id }
        });
        res.json({ message: "Registro actualizado correctamente." });
    } catch (error) {
        res.json({ message: error.message });
    }
}
