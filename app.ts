import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const prisma = new PrismaClient();
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "localhost";

app.use(express.json());

app.get("/users", async(req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.post("/users", async (req, res) => {
  const { name, email, admin } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    return res.status(400).send({ error: "User already exists" });
  } else {
    const createdUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        admin: admin,
        reminders: {
          create: {
            title: "First reminder",
            description: "This is the first reminder",
            details: "This is the first details",
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      },
    });
    res.json(createdUser);
  }
});

app.listen(PORT, HOST, () => console.log(`Server running in ${HOST}:${PORT}`));
