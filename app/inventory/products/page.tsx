'use client'

import { useEffect, useState } from 'react'
import productsData from './sample/products.json'
import Link from 'next/link'
import { Button, Cell, defaultTheme, Provider } from '@adobe/react-spectrum'
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

    const CellClasses = "px-2 py-2 border-b-2 border-slate-400"

    return (
        <Provider theme={defaultTheme}>
            <Layout>
                <h2 className="font-bold text-xl pb-6">商品一覧</h2>
                <div className="pb-6">
                    <Button variant="secondary">商品を追加</Button>
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
                        {data.map((data: any) => (
                            <tr>
                                <td className={CellClasses}>{data.id}</td>
                                <td className={CellClasses}>{data.name}</td>
                                <td className={CellClasses}>{data.price}</td>
                                <td className={CellClasses}>{data.description}</td>
                                <td className={CellClasses}><Link href={`/inventory/products/${data.id}`}>在庫処理</Link></td>
                                <td className={CellClasses}><Button variant="secondary">更新・削除</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Layout>
        </Provider>
    )
}