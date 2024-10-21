"use client"
import { zodResolver } from "@hookform/resolvers/zod";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { signIn } from "next-auth/react";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { loginValidation } from "@/lib/validations";
import Image from "next/image";
import Loader from "@/components/shared/Loader";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Login() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsloading] = useState(false)

  const [errorMessage, setErrorMessage] = useState<string>("")
  const router = useRouter()
  const form = useForm<z.infer<typeof loginValidation>>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginValidation>) {
    console.log(values);
    setIsloading(true)

    try {
      // const res = await fetch(`${apiUrl}/auth/login`, {
      //   method: "POST",
      //   body: JSON.stringify({
      //     email: values?.email,
      //     password: values?.password,
      //   }),
      //   headers: { "Content-Type": "application/json" },
      // });

      // const response = await res.json();
      // console.log(response);

      const result = await signIn('credentials', {
        redirect: false, // Désactive la redirection automatique
        email: values.email,
        password: values.password,
      });

      console.log(result);

      setIsloading(false)
      if (result?.error) {
        setErrorMessage(result?.error)
      }
      router.push("/")

    } catch (error) {
      console.log(error);


    }
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="w-1/2 flex flex-col items-center justify-between">
        <Form {...form}>
          <div className="flex-center sm:w-420 flex-col">
            <Image
              src="/assets/images/logo.svg"
              alt="logo"
              width={100}
              height={100}
            />
            <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
              Login account
            </h2>
            <p className="text-light-3 small-medium md:base-regular">
              To use snapgram,please enter your details
            </p>

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5 w-full mt-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email"
                        {...field}
                        className="shad-input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
                        {...field}
                        className="shad-input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="shad-button_primary">
                {isLoading ? (
                  <div className="flex-center gap-2">
                    <Loader /> Loading
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
              <p className="text-small-regular text-light-2 text-center">
                {" don't you have an account? "}
                <Link
                  href="/register"
                  className="text-primary-500 text-small-semibold ml-1"
                >
                  sign up
                </Link>
              </p>
              {errorMessage && <span className="text-red text-xl">
                {errorMessage}
              </span>
              }
            </form>
          </div>
        </Form>
      </div>
      <div className="w-1/2"></div>
    </div>
  );
}

export default Login;
