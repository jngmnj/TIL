"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    setIsLoading(true);
    try {
        const {data} = await axios.post('/api/register', body)
        // console.log(data)
        router.push("/auth/login")
    } catch(error) {
        console.log(error);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <section className="grid h-[calc(100vh_-_56px)] place-items-center">
      <form
        className="flex flex-col justify-center gap-4 min-w-[350px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl">가입하기</h1>
        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
        />
        <Input
          id="name"
          label="name"
          disabled={isLoading}
          register={register}
          errors={errors}
        />
        <Input
          id="password"
          label="password"
          type="password"
          disabled={isLoading}
          register={register}
          errors={errors}
        />

        <Button label="가입하기" />
        <div className="text-center">
          <p className="text-gray-400">
            이미 회원이신가요?&nbsp;
            <Link href="/auth/login" className="text-black hover:underline">
              로그인하기
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;
