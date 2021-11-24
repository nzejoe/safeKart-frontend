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


