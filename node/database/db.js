import {Sequelize} from 'sequelize'

const db = new Sequelize('database_proyectojr','root','',{
    host:'localhost',
    dialect:'mysql'
})

export default db