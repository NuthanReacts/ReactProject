import React,{ useEffect } from 'react'
import axios from 'axios'
import ProductList from '../components/Index/ProductList'
import baseUrl from '../utils/baseUrl'

function Home({ products}) {
  
  // useEffect(() => {
  //     getProducts()
  // },[])

  // async function getProducts() {
  //   const url = 'http://localhost:3000/api/products'
  //   const response = await axios.get(url)
  //   console.log(response.data)
  // }
  return <ProductList products={products}/>;
}

Home.getInitialProps = async () => {
    //fetch data on server
    //return response data as an object
    const url = `${baseUrl}/api/products`
    const response = await axios.get(url)
    return { products: response.data}
    //note:// this object will be merged with existing props
}

export default Home;
