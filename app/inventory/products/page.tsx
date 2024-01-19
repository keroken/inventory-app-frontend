'use client'

import { useEffect, useState } from 'react'
import productsData from './sample/products.json'
import Link from 'next/link'
import styles from './page.module.scss'

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

    return (
        <>
            <h2 className="font-bold text-xl">商品一覧</h2>
            <button className={styles.button}>商品を追加</button>
            <table className={styles.table}>
                <thead>
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
                            <td>{data.id}</td>
                            <td>{data.name}</td>
                            <td>{data.price}</td>
                            <td>{data.description}</td>
                            <td><Link href={`/inventory/products/${data.id}`}>在庫処理</Link></td>
                            <td><button className={styles.button}>更新・削除</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>商品の一覧を表示</p>
        </>
    )
}