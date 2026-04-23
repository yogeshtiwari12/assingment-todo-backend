import { Todo } from "../model/todo.js";

export const createTodo = async (req, res) => {
	try {
		const { title, description, status } = req.body;

		if (!title || !description) {
			return res.status(400).json({ error: "title and description are required" });
		}

		const todo = await Todo.create({
			title,
			description,
			status,
			userId: req.user._id,
		});
		return res.status(201).json({ message: "Todo created", todo });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export const getTodos = async (req, res) => {
	try {
		const todos = await Todo.find({ userId: "69ea6fb229858f344bcecb2d" }).sort({ createdAt: -1 });
		return res.status(200).json({ todos });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export const getTodoById = async (req, res) => {
	try {
		const { id } = req.params;
		const todo = await Todo.findById(id);

		if (!todo) {
			return res.status(404).json({ error: "Todo not found" });
		}

		return res.status(200).json({ todo });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export const updateTodo = async (req, res) => {
	try {
		const { id } = req.params;
		const updates = req.body;
        

		const todo = await Todo.findByIdAndUpdate(id, updates, {
			new: true,
			runValidators: true,
		});

		if (!todo) {
			return res.status(404).json({ error: "Todo not found" });
		}

		return res.status(200).json({ message: "Todo updated", todo });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export const deleteTodo = async (req, res) => {
	try {
		const { id } = req.params;
		const todo = await Todo.findByIdAndDelete(id);

		if (!todo) {
			return res.status(404).json({ error: "Todo not found" });
		}

		return res.status(200).json({ message: "Todo deleted" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
