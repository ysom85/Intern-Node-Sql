import mysql from 'mysql' 
const mysqlConnection = mysql.createConnection({
    host: "sql6.freesqldatabase.com",
    user: "sql6632833",
    password: "3VVNk5H32S",
    database: "sql6632833",
    multipleStatements: true  
})  
export const createEmployee = (req, res)=>{
    //Data has been taken from api to lical variable 
    const { emp_id, emp_iname, emp_job_title, emp_phone_number, emp_mail, emp_address, emp_city, emp_state, con1_name, con1_mobile_number, con1_relationship, con2_name, con2_mobile_number, con2_relationship}=req.body;
    //id is unique and primary key attribute same to every three database table(employee, contact1, contact2)
    const con1_id = emp_id;
    const con2_id = emp_id;
    var sql = "INSERT INTO employee (emp_id, emp_iname, emp_job_title, emp_phone_number, emp_mail, emp_address, emp_city, emp_state) VALUES ?";
    var values = [[emp_id, emp_iname, emp_job_title, emp_phone_number, emp_mail, emp_address, emp_city, emp_state]];
    mysqlConnection.query(sql,[values],(err, rows, fields)=>{
        if(!err)
        res.send('Inserted Sucessfully')
        else
        console.log(err)
    })
    sql = "INSERT INTO contact1 (con1_id, con1_name, con1_mobile_number, con1_relationship) VALUES ?"
    values = [[con1_id, con1_name, con1_mobile_number, con1_relationship]]
    mysqlConnection.query(sql, [values], (err, rows, fields)=>{
        if(!err)
        res.send('Inserted Sucessfully')
        else
        console.log(err)
    })
    sql = "INSERT INTO contact2 (con2_id, con2_name, con2_mobile_number, con2_relationship) VALUES ?"
    values = [[con2_id, con2_name, con2_mobile_number, con2_relationship]]
    mysqlConnection.query(sql,[values],(err, rows, fields)=>{
        if(!err)
        res.send('Inserted Sucessfully')
        else
        console.log(err)
    })
}

export const listEmployee =  (req,res)=>{
    mysqlConnection.query(`SELECT * FROM employee
        JOIN contact1 ON employee.emp_id=contact1.con1_id
        JOIN contact2 ON employee.emp_id=contact2.con2_id;`, (err, result, fields)=>{
            if(err){
            return console.log(err);
        }
        res.send(result);
    })
      
      
}
    
export const updateEmployee = (req, res)=>{ 
    const { emp_id, emp_iname, emp_job_title, emp_phone_number, emp_mail, emp_address, emp_city, emp_state, con1_name, con1_mobile_number, con1_relationship, con2_name, con2_mobile_number, con2_relationship}=req.body;
    const id = req.params.id
    mysqlConnection.query(`UPDATE employee 
        SET emp_iname="${emp_iname}", emp_job_title= "${emp_job_title}", emp_phone_number="${emp_phone_number}", emp_mail="${emp_mail}", emp_address="${emp_address}", emp_city="${emp_city}", emp_state="${emp_state}"   
        WHERE emp_id=${id};`,(err,rows,fields)=>{
            if(!err)
                res.send('Updated Sucessfully')
            else
                console.log(err)   
    })      
    mysqlConnection.query(`UPDATE contact1 
    SET con1_name="${con1_name}", con1_mobile_number= "${con1_mobile_number}", con1_relationship="${con1_relationship}" 
    WHERE con1_id=${id};`,(err,rows,fields)=>{
        if(!err)
            res.send('Updated Sucessfully')
        else
            console.log(err)   
    })
    mysqlConnection.query(`UPDATE contact2 
        SET con2_name="${con2_name}", con2_mobile_number= "${con2_mobile_number}", con2_relationship="${con2_relationship}" 
        WHERE con2_id=${id};`,(err,rows,fields)=>{
            if(!err)
                res.send('Updated Sucessfully')
            else
                console.log(err)   
    })
}  
  
export const deleteEmployee =(req, res) =>{
    const id=req.params.id
    mysqlConnection.query(`DELETE FROM employee WHERE emp_id=${id};`,(err,result,fields)=>{
        if(!err)
        res.send('Deleted Sucessfully')
        else
        console.log(err)     
})
    mysqlConnection.query(`DELETE FROM contact1 WHERE con1_id=${id};`,(err,rows,fields)=>{
    if(!err)
    res.send('Deleted Sucessfully')
    else
    console.log(err) 
})
    mysqlConnection.query(`DELETE FROM contact2 WHERE con2_id=${id};`,(err,rows,fields)=>{
    if(!err)
    res.send('Deleted Sucessfully')
    else
    console.log(err) 
})

}   
export const getEmployee =(req, res) =>{
    const id=req.params.id
    mysqlConnection.query(`SELECT * FROM employee
        JOIN contact1 ON employee.emp_id=contact1.con1_id
        JOIN contact2 ON employee.emp_id=contact2.con2_id WHERE emp_id=${id};`, (err, result, fields)=>{
            if(err){
                return console.log(err);
            }
            res.send(result);
    })
}


export default createEmployee; 