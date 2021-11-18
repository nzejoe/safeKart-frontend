import React from 'react'

import ProductList from '../Products/ProductList'

const Store = () => {
    return (
        <section className={`section `}>
            <div className="section__wrapper">
                <ProductList/>
            </div>
        </section>
    )
}

export default Store
