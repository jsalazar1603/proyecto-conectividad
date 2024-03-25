import UserModel from '../models/UserModel.js';
import  nodemailer from 'nodemailer';

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

///Actualizar el estado de un usuario

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
    try{
        const errores=[];
        const existeDni= await UserModel.findOne({where:{dni:req.body.dni}});
        if(existeDni){errores.push('DNI');}
        const existeCorreo= await UserModel.findOne({where:{correo:req.body.correo}});
        if(existeCorreo){errores.push('Correo');}
        const existeTelefono= await UserModel.findOne({where:{telefono:req.body.telefono}});
        if(existeTelefono){errores.push('Telefono');}
        //Si hay errores, mostrar mensaje de error
        if(errores.length>0){
            res.json({message:`El ${errores.join(', ')} ya existe`,ok:false});
        }else{
        //Si no hay errores, crear el usuario
            const newUser= await UserModel.create(req.body);
            const correo= newUser.correo;
            const usuario= newUser.usuario;
            const contraseña= newUser.contraseña;
            await enviarCorreo(correo,usuario,contraseña);
            console.log(correo,usuario,contraseña);
            res.json({message:"Registro creado exitosamente",ok:true});
        }
    }catch(error){
        res.json({ message: "Error al conectar con la base de datos"});
    }
}

//Actualizar un usuario 
export const updateUserValDni = async (req, res) => {
    try {
        const errores=[];
        const existeDni= await UserModel.findOne({where:{dni:req.body.dni}});
        if(existeDni && existeDni.id !== parseInt(req.params.id)){errores.push('DNI');}
        const existeCorreo= await UserModel.findOne({where:{correo:req.body.correo}});
        if(existeCorreo && existeCorreo.id !== parseInt(req.params.id)){errores.push('Correo');}
        const existeTelefono= await UserModel.findOne({where:{telefono:req.body.telefono}});
        if(existeTelefono && existeTelefono.id !== parseInt(req.params.id)){errores.push('Telefono');}
        //Si hay errores, mostrar mensaje de error
        if(errores.length>0){
            res.json({message:`El ${errores.join(', ')} ya existe`,ok:false});
        }else{
        //Si no hay errores, actualizar el usuario
            await UserModel.update(req.body);
            res.json({message:"Registro actualizado exitosamente",ok:true});
        }
    } catch (error) {
         res.json({ message: "error al conectar con la base de datos" });
    }
}

// Configura el transporte de correo
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    //service: 'gmail',
  auth: {
    user: 'joshuazevallos017@gmail.com',
    pass: 'mfzbzqwrnjeaqmok'
  }
});

// Función para enviar correo electrónico
async function enviarCorreo( destinatario,usuario, contraseña) {
  // Configura el contenido del correo electrónico
  const mailOptions = {
    from: 'joshuazevallos017@gmail.com',
    to: destinatario,
    subject: 'Credenciales de acceso',
    text : `Hola, gracias por registrarte. Tu nombre de usuario es: ${usuario} y tu contraseña es: ${contraseña}`
    //text: Hola,Gracias por registrarte. Tu nombre de usuario es: ${usuario} y tu contraseña es: ${contraseña}
  };

  try {
    // Envía el correo electrónico
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado:', info.response);
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
  }
}