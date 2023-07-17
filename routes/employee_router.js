import express from "express"
import {
    createEmployee,
    listEmployee , 
    updateEmployee, 
    deleteEmployee, 
    getEmployee
    } from '../controllers/employee.js'
           
const employee_router = express.Router()
employee_router.post("/create", createEmployee)
employee_router.get("/list", listEmployee)
employee_router.post("/update/:id", updateEmployee)
employee_router.post("/delete/:id", deleteEmployee)
employee_router.get("/get/:id", getEmployee)
export default employee_router 