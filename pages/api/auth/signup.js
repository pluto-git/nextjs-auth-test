import { hashPassword } from "../../../lib/auth";
import { connectToDataBase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "POST") {
      return;
  }
    const data = req.body;
    const { email, password } = data;
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message:
          "Invalid input - password also should be at least 7 characters long.",
      });
      return;
    }
    const client = await connectToDataBase();
    const db = client.db();

    const existingUser = await db.collection("users").findOne({email: email});

    if (existingUser){
        res.status(422).json({message: "User exists already!"});
        client.close();
        return;
    }
    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);
    const result = await db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Created user!" });
    client.close();
  
}

export default handler;
