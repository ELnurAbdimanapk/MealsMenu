import React from 'react'

const CartContext = React.createContext({
	items: [],
	totalAmount: 0, // totalPrice
	addItem: (item) => {},
	removeItem: (id) => {},
})

export default CartContext
