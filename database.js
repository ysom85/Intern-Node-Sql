import mysql from 'mysql'
export function connectDB(){
    const mysqlConnection = mysql.createConnection({
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database,
        multipleStatements: true
      
    })
    console.log()
    mysqlConnection.connect((err)=>{
        if(!err)
        console.log('DB connection suceeded.');
        else
        console.log('DB connection failed')
    })
}

export default connectDB;


 
 