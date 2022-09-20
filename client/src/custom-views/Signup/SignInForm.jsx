import { useForm } from "react-hook-form";
import React from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Alert from "@mui/material/Alert";
import { useLogin, useNotify } from "react-admin";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import cardStyles from "./cardStyles";
export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const notify = useNotify();
  const login = useLogin();
  const onSubmit = (data) => {
    const { email, password } = data;
    login({
      username: email,
      password,
    }).catch(() => notify("Invalid email or password"));
  };

  return (
    <Card sx={cardStyles}>
      <CardContent>
        <h2>Sign-In</h2>
        <Stack spacing={2} as={"form"} onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth>
            <InputLabel id="Email-label">Email</InputLabel>
            <Input
              type="text"
              labelId="Email-label"
              id="Email"
              {...register("email", {
                required: { value: true, message: "Email is required" },
                pattern: {
                  value: /^\S+@\S+$/i,
                  message:
                    "Email doesn't match email pattern (eg. example@example.com)",
                },
              })}
            />
            {errors?.email ? (
              <Alert severity={"error"}>{errors.email.message}</Alert>
            ) : null}
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="Password-label">Password</InputLabel>
            <Input
              id={"password"}
              labelId="Password-label"
              type="password"
              {...register("password", {
                required: { value: true, message: "Password is required" },
                minLength: {
                  value: 5,
                  message: "Password must be 5 characters or more",
                },
                maxLength: {
                  value: 20,
                  message: "Password must be 20 characters or less",
                },
              })}
            />
            {errors?.password ? (
              <Alert severity={"error"}>{errors.password.message}</Alert>
            ) : null}
          </FormControl>
          <Button type={"submit"}>Submit</Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
