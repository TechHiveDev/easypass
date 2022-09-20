import { useForm } from "react-hook-form";
import React from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useLogin, useNotify } from "react-admin";
import { queryAuth } from "../../reactAdmin/providers/auth.provider.hook";
import config from "../../configs/config";
import cardStyles from "./cardStyles";

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const notify = useNotify();
  const login = useLogin();
  const onSubmit = async (data) => {
    const res = await queryAuth(config.baseUrl + "/oauth/register", {
      ...data,
      active: true,
    });
    const { email: username, password } = data;
    if (res?.user?.id) {
      login({
        username,
        password,
      }).catch(() => notify("Invalid email or password"));
    } else {
      notify("Error while registering");
    }
  };

  return (
    <Card sx={cardStyles}>
      <CardContent>
        <h2>Sign-Up</h2>
        <Stack spacing={2} as={"form"} onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth>
            <InputLabel id="Name-label">Name</InputLabel>
            <Input
              type="text"
              labelId="Name-label"
              id="Name"
              {...register("name", {
                required: { value: true, message: "Name is required" },
                minLength: {
                  value: 3,
                  message: "Name can't be less than 3 characters",
                },
              })}
            />
            {errors?.name ? (
              <Alert severity={"error"}>{errors.email.name}</Alert>
            ) : null}
          </FormControl>
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
                    "Email doesn't match email pattern(eg. example@example.com)",
                },
              })}
            />
            {errors?.email ? (
              <Alert severity={"error"}>{errors.email.message}</Alert>
            ) : null}
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="Phone-label">Phone</InputLabel>
            <Input
              type="tel"
              labelId="Phone-label"
              id="Phone"
              {...register("phone", {
                required: { value: true, message: "Phone is required" },
              })}
            />
            {errors?.phone ? (
              <Alert severity={"error"}>{errors.phone.message}</Alert>
            ) : null}
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="Password-label">Password</InputLabel>
            <Input
              id={"Password"}
              labelId="Password-label"
              type="password"
              {...register("password", {
                required: { value: true, message: "Password is required" },
                minLength: {
                  value: 8,
                  message: "Password must be 8 characters or more",
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
          <FormControl>
            <InputLabel id="ConfirmPassword-label">Confirm Password</InputLabel>
            <Input
              type="password"
              label-id={"ConfirmPassword-label"}
              {...register("ConfirmPassword", {
                validate: (val) => {
                  if (watch("password") !== val) {
                    return "Your passwords do no match";
                  }
                },
              })}
            />
            {errors?.ConfirmPassword ? (
              <Alert severity={"error"}>{errors.ConfirmPassword.message}</Alert>
            ) : null}
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="Type-label">Type</InputLabel>
            <Select
              labelId="Type-label"
              id="Type"
              label="Age"
              {...register("type", {
                required: { value: true, message: "Type is required" },
              })}
            >
              <MenuItem value="SuperAdmin">SuperAdmin</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Security">Security</MenuItem>
            </Select>
          </FormControl>
          {errors?.type ? (
            <Alert severity={"error"}>{errors.type.message}</Alert>
          ) : null}
          <Button type={"submit"}>Submit</Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
