import express, { Request, Response } from 'express';
import { dbConnection } from './db/init';
import { Todo } from './db/models/to-do';
import 'dotenv/config';

const app = express();

app.use(express.json());
dbConnection();

app.listen(3000, () => {
    console.log("Aplicación corriendo en el puerto 3000");
});

app.get("/todos", async (req: Request, res: Response) => {
    try {
        const tasks = await Todo.findAll();
        res.json(tasks);
    } catch (error) {
        console.error(`Error al encontrar tareas ${error}`);
        res.status(500).json({ message: "Error al encontrar tareas", error: (error as Error).message });
    }
});

app.get('/todos/:id', async (req: Request, res: Response) => {
    try {
        const todo = await Todo.findByPk(req.params.id);
        if (todo) {
            res.json(todo);
        } else {
            res.status(404).json({ message: 'Tarea no encontrada' });
        }
    } catch (error) {
        console.error(`Error al encontrar tarea: ${error}`);
        res.status(500).json({ message: "Error al encontrar tarea", error: (error as Error).message });
    }
});

app.post('/todos', async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const newTask = await Todo.create({
            title,
            description,
            completed: false
        });
        res.status(201).json(newTask);
    } catch (error) {
        console.error(`Error al crear tarea: ${error}`);
        res.status(500).json({ message: "Error al crear tarea", error: (error as Error).message });
    }
});

app.put('/todos/:id', async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const todo = await Todo.findByPk(req.params.id);

        if (todo) {
            await todo.update({
                title: title || todo.title,
                description: description || todo.description,
            });
            res.json(todo);
        } else {
            res.status(404).json({ message: 'Tarea no encontrada' });
        }
    } catch (error) {
        console.error(`Error al actualizar tarea: ${error}`);
        res.status(500).json({ message: "Error al actualizar tarea", error: (error as Error).message });
    }
});

app.delete('/todos/:id', async (req: Request, res: Response) => {
    try {
        const todo = await Todo.findByPk(req.params.id);
        if (todo) {
            await todo.destroy();
            res.json({ message: 'Tarea eliminada' });
        } else {
            res.status(404).json({ message: 'Tarea no encontrada' });
        }
    } catch (error) {
        console.error(`Error al eliminar tarea: ${error}`);
        res.status(500).json({ message: "Error al eliminar tarea", error: (error as Error).message });
    }
});
