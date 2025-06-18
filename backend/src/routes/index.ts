import express from "express";
import studentController from "../controllers/StudentController";
import { registerStudentSchema, updateStudentSchema, validateSchema } from "../schemas/studentSchema";
const router = express.Router();

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

export { router };