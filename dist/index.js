"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const init_1 = require("./db/init");
const to_do_1 = require("./db/models/to-do");
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, init_1.dbConnection)();
app.listen(3000, () => {
    console.log("Aplicación corriendo en el puerto 3000");
});
app.get("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield to_do_1.Todo.findAll();
        res.json(tasks);
    }
    catch (error) {
        console.error(`Error al encontrar tareas ${error}`);
        res.status(500).json({ message: "Error al encontrar tareas", error: error.message });
    }
}));
app.get('/todos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield to_do_1.Todo.findByPk(req.params.id);
        if (todo) {
            res.json(todo);
        }
        else {
            res.status(404).json({ message: 'Tarea no encontrada' });
        }
    }
    catch (error) {
        console.error(`Error al encontrar tarea: ${error}`);
        res.status(500).json({ message: "Error al encontrar tarea", error: error.message });
    }
}));
app.post('/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const newTask = yield to_do_1.Todo.create({
            title,
            description,
            completed: false
        });
        res.status(201).json(newTask);
    }
    catch (error) {
        console.error(`Error al crear tarea: ${error}`);
        res.status(500).json({ message: "Error al crear tarea", error: error.message });
    }
}));
app.put('/todos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const todo = yield to_do_1.Todo.findByPk(req.params.id);
        if (todo) {
            yield todo.update({
                title: title || todo.title,
                description: description || todo.description,
            });
            res.json(todo);
        }
        else {
            res.status(404).json({ message: 'Tarea no encontrada' });
        }
    }
    catch (error) {
        console.error(`Error al actualizar tarea: ${error}`);
        res.status(500).json({ message: "Error al actualizar tarea", error: error.message });
    }
}));
app.delete('/todos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield to_do_1.Todo.findByPk(req.params.id);
        if (todo) {
            yield todo.destroy();
            res.json({ message: 'Tarea eliminada' });
        }
        else {
            res.status(404).json({ message: 'Tarea no encontrada' });
        }
    }
    catch (error) {
        console.error(`Error al eliminar tarea: ${error}`);
        res.status(500).json({ message: "Error al eliminar tarea", error: error.message });
    }
}));
