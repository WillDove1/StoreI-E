// employee.controller.js
import Employee from '../models/employee.models.js';

export const getEmployees = async (req, res) => {
try {
    const employees = await Employee.find();
    res.json(employees);
} catch (error) {
    console.log(error);
    res.status(500).json({ error: ['Error al obtener los empleados'] });
}
}

export const createEmployee = async (req, res) => {
try {
    const { name, salary, age, position, schedule } = req.body;
    const newEmployee = new Employee({
    name,
    salary,
    age,
    position,
    schedule,
    });
    const savedEmployee = await newEmployee.save();
    res.json(savedEmployee);
} catch (error) {
    console.log(error);
    res.status(500).json({ error: ['Error al crear un empleado'] });
}
}

export const getEmployee = async (req, res) => {
    try {
    const employee = await Employee.findById(req.params.id);
    if (!employee)
        return res.status(404).json({ error: ['Empleado no encontrado'] });
    res.json(employee);
    } catch (error) {
    console.log(error);
    res.status(500).json({ error: ['Error al obtener el empleado'] });
    }
}

export const editEmployee = async (req, res) => {
    try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEmployee)
        return res.status(404).json({ error: ['Empleado no encontrado'] });
    res.json(updatedEmployee);
    } catch (error) {
    console.log(error);
    res.status(500).json({ error: ['Error al actualizar el empleado'] });
    }
}

export const deleteEmployee = async (req, res) => {
    try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee)
        return res.status(404).json({ error: ['Error al eliminar el empleado'] });
    res.sendStatus(204);
    } catch (error) {
    console.log(error);
    res.status(500).json({ error: ['Error al eliminar el empleado'] });
    }
}
