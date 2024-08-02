import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from 'antd';

const Products = ()=>{

    const [data, setData] = useState();

    useEffect(()=>{
        ProductData();
    },[])

    const ProductData = async() =>{
        try {
            let productsData = await axios.get('https://dummyjson.com/products')
            console.log("🚀 ~ Products ~ productsData:", productsData.data.products)
            setData(productsData.data.products);
            
        } catch (error) {
            console.log("🚀 ~ Products ~ error:", error)
            
            
        }
    }

    const coloms =[
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
      
    ]

    return(
        <div>
            <h1>Products</h1>
            <Table dataSource={data} columns={coloms} />
        </div>
    )
  
    
}

export default Products;