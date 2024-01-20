'use client'

import React, { useEffect, useState } from 'react'
import productsData from './sample/products.json'
import Link from 'next/link'
import { Button, defaultTheme, Provider } from '@adobe/react-spectrum'
import { PressEvent } from 'react-aria'
import { clsx } from 'clsx'
import { Layout } from '@/app/components/layout'

type ProductsData = {
    id: number;
    name: string;
    price: number;
    description: string;
};

export default function Page() {
    const [data, setData] = useState<Array<ProductsData>>([])

    useEffect(() => {
        setData(productsData);
    }, [])

    const [showNewRow, setShowNewRow] = useState(false)
    const handleShowNewRow = (event: PressEvent) => {
        setShowNewRow(true)
    }
    const handleAddCancel = (event: PressEvent) => {
        setShowNewRow(false)
    }
    const handleAdd = (event: PressEvent) => {
        // backend: add item process
        setShowNewRow(false)
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
                                <td className={CellClasses}><input type="text" /></td>
                                <td className={CellClasses}><input type="number" /></td>
                                <td className={CellClasses}><input type="text" /></td>
                                <td className={CellClasses}></td>
                                <td className={CellClasses}><Button variant="secondary" onPress={handleAddCancel}>キャンセル</Button></td>
                            </tr>
                        ) : ""}
                        {data.map((data: any) => (
                            <tr>
                                <td className={CellClasses}>{data.id}</td>
                                <td className={CellClasses}>{data.name}</td>
                                <td className={CellClasses}>{data.price}</td>
                                <td className={CellClasses}>{data.description}</td>
                                <td className={clsx(CellClasses, 'w-20 text-center')}><Link href={`/inventory/products/${data.id}`}>在庫処理</Link></td>
                                <td className={clsx(CellClasses, 'w-32 text-center')}><Button variant="secondary">更新・削除</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Layout>
        </Provider>
    )
}