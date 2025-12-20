"use server";

import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const postUser = async (payload) => {
  console.log(payload);

  // 0. Validation

  // 1. Check user exist or not

  const userExist = await dbConnect("Users").findOne({ email: payload });
  if (userExist) {
    return {
      success: false,
      message: "User already existed.",
    };
  }

  const hashedPass = await bcrypt.hash(payload.password, 10);
  // console.log(hashedPass);

  // 2. Create new user

  const newUser = {
    ...payload,
    role: "User",
    createdAt: new Date().toISOString,
    password: hashedPass,
  };

  console.log(newUser);
  // 3. Send user to DB
  const result = await dbConnect("Users").insertOne(newUser);
  if (result.acknowledged) {
    return {
      success: true,
      message: `User created with ${result.insertedId.toString()}`,
    };
  }
};
