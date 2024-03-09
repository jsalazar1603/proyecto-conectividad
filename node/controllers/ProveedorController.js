import ProveedorModel from "../models/ProveedorModel.js";

// Mostrar todos los Proveedores
export const getAllProveedores = async (req, res) => {
    try {
        const proveedores = await ProveedorModel.findAll();
        res.json(proveedores);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Mostrar un Proveedor por su id
export const getProveedor = async (req, res) => {
    try {
        const proveedor = await ProveedorModel.findAll({
            where: {
                id: req.params.id
            }
        })
        res.json(proveedor[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Crear un registro de proveedor
export const createProveedor = async (req, res) => {
    try {
        const errores=[];
        const existeCorreo= await ProveedorModel.findOne({where:{correo:req.body.correo}});
        if(existeCorreo){errores.push('Correo');}
        const existeTelefono= await ProveedorModel.findOne({where:{telefono:req.body.telefono}});
        if(existeTelefono){errores.push('Telefono');}
        const existeWeb= await ProveedorModel.findOne({where:{sitioweb:req.body.sitioweb}});
        if(existeWeb){errores.push('Sitio Web');}
        //Si hay errores, mostrar mensaje de error
        if(errores.length>0){
            res.json({message:`El ${errores.join(', ')} ya existe`,ok:false});
        }else{
            //Si no hay errores, crear el registro
            await ProveedorModel.create(req.body);
        res.json({ message: "Registro creado exitosamente" });
        }

    } catch (error) {
        res.json({ message: error.message });
    }
}

// Actualizar datos de un proveedor
export const updateProveedor = async (req, res) => {
    try {
        const errores=[];
        const existeCorreo= await ProveedorModel.findOne({where:{correo:req.body.correo}});
        if(existeCorreo && existeCorreo.id !== parseInt(req.params.id)){errores.push('Correo');}
        const existeTelefono= await ProveedorModel.findOne({where:{telefono:req.body.telefono}});
        if(existeTelefono && existeTelefono.id !== parseInt(req.params.id)){errores.push('Telefono');}
        const existeWeb= await ProveedorModel.findOne({where:{sitioweb:req.body.sitioweb}});
        if(existeWeb && existeWeb.id !== parseInt(req.params.id)){errores.push('Sitio Web');}
        //Si hay errores, mostrar mensaje de error
        if(errores.length>0){
            res.json({message:`El ${errores.join(', ')} ya existe`,ok:false});
        }else{
            //Si no hay errores, actualizar Proveedor
            await ProveedorModel.update(req.body);
        res.json({ message: "Registro actualizado exitosamente" });
        }

    } catch (error) {
        res.json({ message: error.message });
    }
}

// Eliminar datos de un proveedor
export const deleteProveedor = async (req, res) => {
    try {
        await ProveedorModel.destroy({
            where: { id: req.params.id }
        });
        res.json({ message: "Registro eliminado correctamente" });
    } catch (error) {
        res.json({ message: error.message });
    }
}