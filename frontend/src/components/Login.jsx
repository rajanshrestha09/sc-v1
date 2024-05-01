import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "@/storeconfig/loginSlice";
import { useNavigate } from "react-router-dom";
import { AlertBoxLogin } from "./AlertBoxLogin";


const formSchema = z.object({
  username: z.string().min(5, {
    message: "Invalid username",
  }),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must be 8+ characters with upper, lower, digit, special.",
      }
    ),
});

function Login() {
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (value) => {
    dispatch(loginStart());
    try {
      const loggedInUser = await fetch("/api/v1/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });
      const user = await loggedInUser.json();
      if (user.statusCode === 200) {
        dispatch(loginSuccess(user.data));
        navigate("/");
      } else {
        dispatch(loginFailure(user.error));
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
      setShowAlert(true)
    }
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center my-20">
      <div className="px-6 py-10 border border-slate-600 shadow-2xl">
        <div className="mb-4 text-center">
          <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Login
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-2">
            Dont have an account?{" "}
            <Link to="/signup">
              {" "}
              <span className="text-blue-600 hover:underline">
                Register
              </span>{" "}
            </Link>
          </p>
        </div>
        {showAlert && (
          <div className="my-2">
            {" "}
            <AlertBoxLogin />
          </div>
        )}
        <div className="sm:w-[400px] md:w-[400px] ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="text-left mb-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="text-left mb-4">
                {" "}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="text-center">
                <Button type="submit" variant="secondary">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
