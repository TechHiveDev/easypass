import { useForm } from "react-hook-form";
import React from "react";
import { messages } from "./constants";

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <input
        type="text"
        placeholder="Email"
        {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
      />
      {errors?.Email
        ? `Email ${errors.Email.type === "pattern" ? "" : "is"} ${
            messages[errors.Email.type] || errors.Email.message
          }`
        : ""}
      <input
        type="password"
        placeholder="Password"
        {...register("Password", {
          required: true,
          minLength: 8,
          maxLength: 20,
        })}
      />
      {errors?.Password
        ? `Password is ${
            messages[errors.Password.type] || errors.Password.message
          }`
        : ""}
      <input
        type="password"
        placeholder="Confirm Password"
        {...register("ConfirmPassword", {
          validate: (val) => {
            if (watch("Password") !== val) {
              return "Your passwords do no match";
            }
          },
        })}
      />
      {errors?.ConfirmPassword ? errors.ConfirmPassword.message : ""}
      <select {...register("Type", { required: true })}>
        <option value="SuperAdmin">SuperAdmin</option>
        <option value="Admin">Admin</option>
        <option value="Security">Security</option>
      </select>

      <input type="submit" />
    </form>
  );
};
