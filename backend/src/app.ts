import express from 'express';
import cors from 'cors';
import router  from './routes/index.js';

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));

app.use(express.json());


if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "API funcionando corretamente",
    endpoints: {
      health: 'GET /api/health',
      createStudent: 'POST /api/student',
      getAllStudents: 'GET /api/student',
      getStudentById: 'GET /api/student/:id',
      updateStudent: 'PATCH /api/student/:id',
      deleteStudent: 'DELETE /api/student/:id',
    }
  });
});

app.use("/api", router);

// app.all("*", (req, res) => {
//   res.status(404).json({
//     error: "Rota não encontrada",
//     message: `A rota ${req.method} ${req.originalUrl} não existe`,
//   });
// });

export default app;
