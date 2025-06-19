/*
  Warnings:

  - A unique constraint covering the columns `[email,ra,cpf]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Student_email_ra_cpf_key" ON "Student"("email", "ra", "cpf");
