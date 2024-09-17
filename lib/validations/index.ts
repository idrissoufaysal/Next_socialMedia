import { z } from "zod";

export const loginValidation = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters",
  }),
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});
