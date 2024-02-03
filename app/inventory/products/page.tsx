'use client'

import { useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import productsData from './sample/products.json'
import Link from 'next/link'
import { defaultTheme, Provider } from '@adobe/react-spectrum'
import { clsx } from 'clsx'
import { Layout } from '@/app/components/layout'

type ProductData = {
  id: number | null
  name: string
  price: number
  description: string
};

export default function Page() {
  const [data, setData] = useState<Array<ProductData>>([])
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setData(productsData);
  }, [])

  const [id, setId] = useState<number | null>(0)
  // branch action on submit
  const [action, setAction] = useState<string>("")
  const onSubmit = (event: any): void => {
    const data: ProductData = {
      id: id,
      name: event.name,
      price: Number(event.price),
      description: event.description,
    }
    // switch HTTP method and params according to action
    if (action === "add") {
      handleAdd(data)
    } else if (action === "update") {
      if (data.id === null) {
        return
      }
      handleEdit(data)
    } else if (action === "delete") {
      if (data.id === null) {
        return
      }
      handleDelete(data.id)
    }
  }

  // keep newly registered data
  const handleShowNewRow = () => {
    setId(null)
    reset({
      name: "",
      price: "0",
      description: "",
    })
  }
  const handleAddCancel = () => {
    setId(0)
  }
  const handleAdd = (data: ProductData) => {
    setId(0)
  }

  // update and delete operations
  const handleEditRow = (id: number | null) => {
    const selectedProduct: ProductData = data.find((v) => v.id === id) as ProductData
    setId(selectedProduct.id)
    reset({
      name: selectedProduct.name,
      price: selectedProduct.price,
      description: selectedProduct.description,
    })
  }
  const handleEditCancel = () => {
    setId(0)
  }

  const handleEdit = (data: ProductData) => {
    setId(0)
  }

  const handleDelete = (id: number) => {
    setId(0)
  }

  const CellClasses = "px-2 py-2 border-b-2 border-slate-400"

  return (
    <Provider theme={defaultTheme}>
      <Layout>
        <h2 className="font-bold text-xl pb-6">商品一覧</h2>
        <div className="pb-6">
          <button type="button" onClick={handleShowNewRow}>商品を追加</button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <table>
            <thead className="border-b-4 border-sky-500">
              <tr>
                <th>商品ID</th>
                <th>商品名</th>
                <th>単価</th>
                <th>説明</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {id === null ? (
                <tr>
                  <td className={CellClasses}></td>
                  <td className={CellClasses}>
                    <input type="text" id="name" {...register("name", { required: true, maxLength: 100 })} />
                    {errors.name && (<div>100文字以内の商品名を入力してください</div>)}
                  </td>
                  <td className={CellClasses}>
                    <input type="number" id="price" {...register("price", { required: true, min: 1, max: 99999999 })} />
                    {errors.name && (<div>1から99999999の数値を入力してください</div>)}
                  </td>
                  <td className={CellClasses}>
                    <input type="text" id="description" {...register("description")} />
                  </td>
                  <td className={CellClasses}></td>
                  <td className={CellClasses}>
                    <button type="button" onClick={() => handleAddCancel()}>キャンセル</button>
                    <button type="submit" onClick={() => setAction("add")}>登録する</button>
                  </td>
                </tr>
              ) : ""}
              {data.map((data: any) => (
                id === data.id ? (
                  <tr key={data.id}>
                    <td className={CellClasses}>{data.id}</td>
                    <td className={CellClasses}>
                      <input type="text" id="name" {...register("name", { required: true, maxLength: 100 })} />
                      {errors.name && (<div>100文字以内の商品名を入力してください</div>)}
                    </td>
                    <td className={CellClasses}>
                      <input type="number" id="price" {...register("price", { required: true, min: 1, max: 99999999 })} />
                      {errors.name && (<div>1から99999999の数値を入力してください</div>)}
                    </td>
                    <td className={CellClasses}>
                      <input type="text" id="description" {...register("description")} />
                    </td>
                    <td className={clsx(CellClasses, 'w-20 text-center')}></td>
                    <td className={clsx(CellClasses, 'w-32 text-center')}>
                      <button type="button" onClick={() => handleEditCancel()}>キャンセル</button>
                      <button type="submit" onClick={() => setAction("update")}>更新する</button>
                      <button type="submit" onClick={() => setAction("delete")}>削除する</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={data.id}>
                    <td className={CellClasses}>{data.id}</td>
                    <td className={CellClasses}>{data.name}</td>
                    <td className={CellClasses}>{data.price}</td>
                    <td className={CellClasses}>{data.description}</td>
                    <td className={clsx(CellClasses, 'w-20 text-center')}><Link href={`/inventory/products/${data.id}`}>在庫処理</Link></td>
                    <td className={clsx(CellClasses, 'w-32 text-center')}><button onClick={() => handleEditRow(data.id)}>更新・削除</button></td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </form>
      </Layout>
    </Provider>
  )
}