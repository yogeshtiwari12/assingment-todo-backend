import { Router } from "express";
import { signup, login, logout } from "../methods/user.js";
import {
	createTodo,
	getTodos,
	getTodoById,
	updateTodo,
	deleteTodo,
} from "../methods/todo.js";
import { verifyToken } from "../verifytoken/verifytoken.js";

const router = Router();

router.put("/signup", signup);
router.post("/login", login);
router.post("/logout",verifyToken, logout);

router.post("/createtodo", verifyToken, createTodo);
router.get("/getusertodos", verifyToken, getTodos);
router.patch("/updatetodo/:id", verifyToken, updateTodo);
router.delete("/deletetodo/:id", verifyToken, deleteTodo);

export default router;
