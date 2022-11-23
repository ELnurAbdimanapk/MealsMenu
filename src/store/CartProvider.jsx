import React, { useReducer } from "react";
import CartContext from "./cart-context";

const cartReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD": {
      const existingCartItemIndex = state.items.findIndex((item) => {
        return item.id === action.item.id; //nahodim index
      });

      const existingCartItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount + action.item.price;

      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };

	 
    }
	case "REMOVE":{
		const existingCartItemIndex= state.items.findIndex((item) => {
			return item.id === action.id;
		});
		const existingItem = state.items[existingCartItemIndex]
		
		const updatedTotalAmount = state.totalAmount-existingItem.price
		
		let updatedItems;

		if(existingItem.amount ===1) {
			updatedItems = state.items.filter((item) =>item.id !== action.id)  //minimalniy 1 ge barabar bolot

		}else {
		const updatedItem = {
				...existingItem,
				amount:existingItem.amount-1
			}
			updatedItems =[...state.items];
			updatedItems[existingCartItemIndex]= updatedItem
		}
		return {
			items:updatedItems,
			totalAmount:updatedTotalAmount,
		}
	}
    default:
      return state;

   
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchFood] = useReducer(cartReducer, {
    items: [],
    totalAmount: 0,
  });

  const addItem = (item) => {
    dispatchFood({ type: "ADD", item: item });
  };

  const removeItems = (id) => {
    dispatchFood({ type: "REMOVE", id: id });
  };
  const clearCart = () => {
    dispatchFood({ type: "CLEAR_FOOD" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItem,
    removeItem: removeItems,
    clearCart: clearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
