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
  signupStart,
  signupSuccess,
  signupFailure,
} from "@/storeconfig/signupSlice";
import { AlertDialogBox } from "./AlertDialogBox";

const formSchema = z.object({
  firstName: z.string().nonempty().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  lastName: z.string().nonempty().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email().min(2, {
    message: "Invalid Email",
  }),

  username: z.string().min(5, {
    message: "Invalid Password",
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

function Signup() {
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = async (value) => {
    dispatch(signupStart());
    try {
      const response = await fetch("/api/v1/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });
      const responseData = await response.json();
      if (response.status === 200) {
        dispatch(signupSuccess(responseData.data));
        setShowAlert(true);
        form.reset();
      } else {
        dispatch(signupFailure(responseData.error));
        setShowAlert(true);
      }
    } catch (error) {
      setShowAlert(true);
      dispatch(signupFailure(error));
      
    }
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center my-20">
      <div className="px-6 py-10 border border-slate-600 shadow-lg">
        <div className="mb-10 text-center">
          <h1 className="scroll-m-20 text-xl md:text-2xl font-semibold tracking-tight">
            Register
          </h1>
          <p className="leading-2 [&:not(:first-child)]:mt-2">
            Already have an account?{" "}
            <Link to="/login">
              {" "}
              <span className="text-blue-600 hover:underline">Login</span>
            </Link>
          </p>
        </div>
        {showAlert && (
          <div className="my-2">
            {" "}
            <AlertDialogBox />
          </div>
        )}
        <div className="w-[300px] md:w-[500px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex gap-2 mb-4">
                <div className="text-left w-[50%]">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="First Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="text-left w-[50%]">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="text-left mb-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="text-left mb-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Username" {...field} />
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
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="text-center ">
                <Button type="submit" variant="default">
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

export default Signup;
