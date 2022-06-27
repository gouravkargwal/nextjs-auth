import { getSession } from "next-auth/react";
import { hashPassword, verifyPasswod } from "../../../helpers/auth";
import { connectDatabase } from "../../../helpers/db";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({
      message: "Not authenticated",
    });
    return;
  }
  const userEmail = session.user.email;
  const { oldPassword, newPassword } = req.body;
  const client = await connectDatabase();
  const userCollection = client.db().collection("users");
  const user = await userCollection.findOne({ email: userEmail });
  if (!user) {
    res.status(404).json({
      message: "USer not found!",
    });
    client.close();
    return;
  }
  const currentPassword = user.password;
  const passwordAreEqual = await verifyPasswod(oldPassword, currentPassword);
  if (!passwordAreEqual) {
    res.status(422).json({
      message: "Password dont match",
    });
    client.close();
    return;
  }
  const hashedPassword = await hashPassword(newPassword);
  const result = await userCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );
  client.close();
  res.status(200).json({ message: "Password Updated" });
}
