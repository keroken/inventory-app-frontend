'use client'

import React, { useEffect, useState } from 'react'
import productsData from './sample/products.json'
import Link from 'next/link'
import { Button, defaultTheme, Provider } from '@adobe/react-spectrum'
import { PressEvent } from 'react-aria'
import { clsx } from 'clsx'
import { Layout } from '@/app/components/layout'

type ProductData = {
  id: number
  name: string
  price: number
  description: string
};

type InputData = {
  id: string
  name: string
  price: string
  description: string
}

export default function Page() {
  const [data, setData] = useState<Array<ProductData>>([])

  useEffect(() => {
    setData(productsData);
  }, [])

  // keep registerd data state
  const [input, setInput] = useState<InputData>({
    id: "",
    name: "",
    price: "",
    description: "",
  })

  // update registered data
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setInput({ ...input, [name]: value })
  }

  // keep newly registered data
  const [showNewRow, setShowNewRow] = useState(false)
  const handleShowNewRow = (event: PressEvent) => {
    setShowNewRow(true)
  }
  const handleAddCancel = (event: any) => {
    event.preventDefault()
    setShowNewRow(false)
  }
  const handleAdd = (event: any) => {
    event.preventDefault()
    // backend: add item process
    setShowNewRow(false)
  }

  // update and delete operations
  const [editingRow, setEditingRow] = useState(0)
  const handleEditRow: any = (id: number) => {
    setEditingRow(id)
    const selectedProduct: ProductData = data.find((v) => v.id == id) as ProductData
    setInput({
      id: id.toString(),
      name: selectedProduct.name,
      price: selectedProduct.price.toString(),
      description: selectedProduct.description,
    })
  }

  const handleEditCancel: any = (id: number) => {
    setEditingRow(0)
  }

  const handleEdit: any = (id: number) => {
    setEditingRow(0)
  }

  const handleDelete: any = (id: number) => {
    setEditingRow(0)
  }

  const CellClasses = "px-2 py-2 border-b-2 border-slate-400"

  return (
    <Provider theme={defaultTheme}>
      <Layout>
        <h2 className="font-bold text-xl pb-6">商品一覧</h2>
        <div className="pb-6">
          <Button variant="secondary" onPress={handleShowNewRow}>商品を追加</Button>
        </div>
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
            {showNewRow ? (
              <tr>
                <td className={CellClasses}></td>
                <td className={CellClasses}><input type="text" name="name" onChange={handleInput} /></td>
                <td className={CellClasses}><input type="number" name="price" onChange={handleInput} /></td>
                <td className={CellClasses}><input type="text" name="description" onChange={handleInput} /></td>
                <td className={CellClasses}></td>
                <td className={CellClasses}>
                  <button onClick={(event) => handleAddCancel(event)}>キャンセル</button>
                  <button onClick={(event) => handleAdd(event)}>登録する</button>
                </td>
              </tr>
            ) : ""}
            {data.map((data: any) => (
              editingRow === data.id ? (
                <tr key={data.id}>
                  <td className={CellClasses}>{data.id}</td>
                  <td className={CellClasses}><input type="text" defaultValue={data.name} value={input.name} name="name" onChange={handleInput} /></td>
                  <td className={CellClasses}><input type="number" defaultValue={data.price} value={input.price} name="price" onChange={handleInput} /></td>
                  <td className={CellClasses}><input type="text" defaultValue={data.description} value={input.description} name="description" onChange={handleInput} /></td>
                  <td className={clsx(CellClasses, 'w-20 text-center')}></td>
                  <td className={clsx(CellClasses, 'w-32 text-center')}>
                    <button onClick={() => handleEditCancel(data.id)}>キャンセル</button>
                    <button onClick={() => handleEdit(data.id)}>更新する</button>
                    <button onClick={() => handleDelete(data.id)}>削除する</button>
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
      </Layout>
    </Provider>
  )
}