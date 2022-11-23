import { useContext } from 'react'
import CartContext from '../../store/cart-context'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = (props) => {
	const cartCotx = useContext(CartContext)

	const countOfCartItems = cartCotx.items?.reduce((currentNum, item) => {
		return currentNum + item.amount
	}, 0)

	return (
		<button className={classes.button} onClick={props.onShowCart}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>You Cart</span>
			<span className={classes.badge}>{countOfCartItems}</span>
		</button>
	)
}

export default HeaderCartButton
