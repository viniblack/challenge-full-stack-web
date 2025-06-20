import express from "express";
import prisma from '../client.js';
import StudentController from "../controllers/StudentController.js";
import { registerStudentSchema, updateStudentSchema, validateSchema } from "../schemas/studentSchema.js";

const router = express.Router();
const studentController = StudentController(prisma);

router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API funcionando corretamente' });
});

/**
 * POST /api/student - Registro de novo estudante
 */
router.post("/student", validateSchema(registerStudentSchema), studentController.create);

/**
 * GET /api/student - Retorna todos estudantes
 */
router.get("/student", studentController.getAll);

/**
 * GET /api/student/:id - Busca estudante por id
 */
router.get("/student/:id", studentController.getById);

/**
 * PATCH /api/student/:id - Atualiza dados do estudante
 */
router.patch("/student/:id", validateSchema(updateStudentSchema), studentController.update);

/**
* DELETE /api/student/:id - Apaga estudante
*/
router.delete("/student/:id", studentController.delete);

export default router
