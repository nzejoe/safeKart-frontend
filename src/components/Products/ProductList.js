import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { getProducts, actions as productActions } from '../../store/product-slice'
import Product from './Product'

const ProductList = () => {
    const { filteredProducts, filter } = useSelector(state => state.products);

    

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getProducts());
    },[dispatch])

    useEffect(()=>{
        dispatch(productActions.getFilterProducts());
    }, [dispatch, filter])

    return (
        <div>
            {filteredProducts && 
               filteredProducts.map((product)=>{
                   return <Product key={product.id} product={product}/>
               })
            }
        </div>
    )
}

export default ProductList;
