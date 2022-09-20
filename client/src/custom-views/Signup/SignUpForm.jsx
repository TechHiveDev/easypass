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
import { useLogin, useNotify, useTranslate } from "react-admin";
import { queryAuth } from "../../reactAdmin/providers/auth.provider.hook";
import config from "../../configs/config";
import cardStyles from "./cardStyles";

export const SignUpForm = () => {
  const translate = useTranslate();
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
      }).catch(() => notify(translate("signCommon.invalid")));
    } else {
      notify(translate("signUp.error"));
    }
  };

  return (
    <Card sx={cardStyles}>
      <CardContent>
        <h2> {translate("signUp.label")}</h2>
        <Stack spacing={2} as={"form"} onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth>
            <InputLabel id="Name-label">
              {translate("signUp.name.label")}
            </InputLabel>
            <Input
              type="text"
              labelId="Name-label"
              id="Name"
              {...register("name", {
                required: {
                  value: true,
                  message: translate("signUp.name.required"),
                },
                minLength: {
                  value: 3,
                  message: translate("signUp.name.minLength", {
                    count: 3,
                  }),
                },
              })}
            />
            {errors?.name ? (
              <Alert severity={"error"}>{errors.name.message}</Alert>
            ) : null}
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="Email-label">
              {translate("signUp.email.label")}
            </InputLabel>
            <Input
              type="text"
              labelId="Email-label"
              id="Email"
              {...register("email", {
                required: {
                  value: true,
                  message: translate("signUp.email.required"),
                },
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: translate("signUp.email.pattern"),
                },
              })}
            />
            {errors?.email ? (
              <Alert severity={"error"}>{errors.email.message}</Alert>
            ) : null}
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="Phone-label">
              {translate("signUp.phone.label")}
            </InputLabel>
            <Input
              type="tel"
              labelId="Phone-label"
              id="Phone"
              {...register("phone", {
                required: {
                  value: true,
                  message: translate("signUp.phone.required"),
                },
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
                required: {
                  value: true,
                  message: translate("signUp.password.required"),
                },
                minLength: {
                  value: 8,
                  message: translate("signUp.password.minLength", {
                    count: 8,
                  }),
                },
                maxLength: {
                  value: 20,
                  message: translate("signUp.password.maxLength", {
                    count: 20,
                  }),
                },
              })}
            />
            {errors?.password ? (
              <Alert severity={"error"}>{errors.password.message}</Alert>
            ) : null}
          </FormControl>
          <FormControl>
            <InputLabel id="ConfirmPassword-label">
              {translate("signUp.confirmPassword.label")}
            </InputLabel>
            <Input
              type="password"
              label-id={"ConfirmPassword-label"}
              {...register("ConfirmPassword", {
                validate: (val) => {
                  if (watch("password") !== val) {
                    return translate("signUp.confirmPassword.match");
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
                required: {
                  value: true,
                  message: translate("singUp.type.label"),
                },
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
          <Button type={"submit"}>{translate("signUp.register")}</Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
