import { hashPassword } from "../../../helpers/auth";
import { connectDatabase } from "../../../helpers/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { email, password } = data;
    // if (
    //   !email ||
    //   !email.includes("@") ||
    //   !password ||
    //   password.trim().length > 7
    // ) {
    //   return res.status(422).json({ message: "Invalid password/username" });
    // }
    const client = await connectDatabase();
    const db = client.db();
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      res.status(422).json({ message: "User already exist!" });
      client.close();
      return;
    }
    const hashedPassword = await hashPassword(password);
    const result = await db
      .collection("users")
      .insertOne({ email, password: hashedPassword });
    console.log(result);
    res.status(201).json({ message: "Created User!" });
    client.close();
  }
}
