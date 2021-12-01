export const getTotalAmount = (cartItems) => {
    if(cartItems){
        let total = 0
        for(let i=0; i<cartItems.length; i++){
            total += cartItems[i].quantity * cartItems[i].product.price
        }

        return total;
    }
}

export const getTotalCart = (cartItems) => {
    let total = 0
    if(cartItems){
        for(let i=0; i<cartItems.length; i++) total += cartItems[i].quantity;
    }
    return total;
};

export const getOrderDate = (orderDate) => {
    const date = new Date(orderDate);
    const year = date.getFullYear();
    const month = date.getUTCMonth();
    const monthString = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const day = date.getDate();

    return `${day}-${monthString[month]}-${year}`;
}

export const getOrderDateTime = (orderDate) => {
    const date = new Date(orderDate);
    const year = date.getFullYear();
    const month = date.getUTCMonth();
    const hour = date.getHours()
    const hourFormatted = hour < 10 && `0${hour}` 
    const minute = date.getMinutes()
    const minuteFormatted = hour < 10 && `0${minute}`; // adding a leading 0 if minute is less than 10
    const monthString = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const day = date.getDate();

    return `${day}-${monthString[month]}-${year} ${hourFormatted}:${minuteFormatted}`;
}


export const getUniqueValues = (arr, type) => {
    if(arr){
        let unique = []
        arr.forEach(item =>{
            let { variations } = item;
            unique.push(...new Set(variations[type])); // this will get the colors instead of color arrays
        })

        return ["all", ...new Set(unique)];
    }
}


export const getUniqueCategory = (products) => {
    if (products) {
        const categories = products.map(product => product['category']);
        return ["all", ...new Set(categories)];
    }
}

export const getMaxPrice = (products) => {
    if(products){
        const price = [];
        products.forEach(product => {
            price.push(parseFloat(product.price));
        })

        return Math.max(...price) + 100
    }
}


export const getPaginatedProducts = (products) => {
    if(products.length > 0){
        const numberPerPage = 6;
        const pages = Math.ceil(products.length / numberPerPage)
        const paginatedProducts = Array.from({length: pages}, (_, index)=>{
            const start = index * numberPerPage;
            const end = start + numberPerPage
            return products.slice(start, end)
        })
       
        return paginatedProducts;
    }
}

