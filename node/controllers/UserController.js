import UserModel from '../models/UserModel.js';

// Mostrar todos los registros
export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll();
        res.json(users);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Mostrar un registro
export const getUser = async (req, res) => {
    try {
        const user = await UserModel.findAll({
            where: {
                id: req.params.id
            }
        })
        res.json(user[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Crear un registro
export const createUser = async (req, res) => {
    try {
        await UserModel.create(req.body);
        res.json({ message: "Registro creado exitosamente" });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Actualizar un registro
export const updateUser = async (req, res) => {
    try {
        await UserModel.update(req.body, {
            where: { id: req.params.id }
        });
        res.json({ message: "Registro actualizado exitosamente" });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Eliminar un registro
export const deleteUser = async (req, res) => {
    try {
        await UserModel.update({estado:false},{
            where: { id: req.params.id }
        });
        res.json({ message: "Registro actualizado correctamente" });
    } catch (error) {
        res.json({ message: error.message });
    }
}

///////////////////////////// No entender esto es lo mismo que actualizar pero con un estado diferente
//// O es para Actualizar el estado de un usuario

export const activateUser = async (req, res) => {
    try {
        await UserModel.update({estado:true},{
            where: { id: req.params.id }
        });
        res.json({ message: "Registro actualizado correctamente." });
    } catch (error) {
        res.json({ message: error.message });
    }
}

//crear un usuario validado por dni
export const createUserValDni = async (req, res) => {
    try {
        const dni = await UserModel.findOne({
            where: {
                dni: req.body.dni
            }
        })
        if (!dni) {
            await UserModel.create(req.body);
            res.json({ message: "Registro creado exitosamente",ok:true });
        } else {
            res.json({ message: "El dni ya existe",ok:false});
        }
    } catch (error) {
        res.json({ message: "error al conectar con la base de datos" });
    }

}

/*
export const validateDni = async (req, res) => {
    const {dni} = req.body; 
    console.log("dni:",dni)
    try {
      // Buscar el usuario en la base de datos por nombre de usuario y contraseña
      const user = await UserModel.findOne({ where: { dni: dni } })
      console.log("dni:",dni)
      if (dni==user.dataValues.dni) {
        // Usuario autenticado
        res.status(200).json({ success: true, message: 'Dni ya registrado en la base de datos',data:user });
      } else {
        // Credenciales incorrectas
        res.status(200).json({ success: false, message: 'Dni valido' });
      }
    } catch (error) {
      // Manejo de errores
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ success: false, message: 'Error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.' });
    }
  };

*/