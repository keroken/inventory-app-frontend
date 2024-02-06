'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Router } from 'next/router'

type FormData = {
  username: string
  password: string
}

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const rounter = useRouter()

  const onSubmit = (event: any): void => {
    const data: FormData = {
      username: event.username,
      password: event.password,
    }

    handleLogin(data)
  }

  const handleLogin = (data: FormData) => {
    rounter.push("/inventory/products")
  }

  const ContainerClasses = 'w-full h-screen flex flex-col items-center'
  const LabelClasses = 'w-full h-8 p-2'
  const InputClasses = 'w-full h-8 p-2 rounded border border-gray-500'
  const ButtonClasses = 'bg-blue-500 text-white py-2 rounded'

  return (
    <div className={ContainerClasses}>
      <form className="flex flex-col w-{200} gap-4" >
        <div>
          <label className={LabelClasses} htmlFor="username">user name</label>
          <input className={InputClasses} type="text" id="username" {...register("username", { required: "必須入力です" })} />
        </div>
        <div>
          <label className={LabelClasses} htmlFor="password">password</label>
          <input className={InputClasses} type="text" id="password" {...register("password", { required: "必須入力です", minLength: { value: 8, message: "8文字以上の文字列にしてください" } })} />
        </div>
        <button className={ButtonClasses} type="submit">Login</button>
      </form>
    </div>
  )
}
