import React, { useRef, useState } from 'react'
import Input from '../../UI/Input'
import styles from './MealItemForm.module.css'

const MealItemForm = (props) => {
	const [amountIsValid, setAmountIsValid] = useState(true)

	const amountRef = useRef()

	const inputProps = {
		id: `amount_id-${props.id}`,
		type: 'number',
		step: '1',
		defaultValue: '1',
	}
	const submitHandler = (e) => {
		e.preventDefault()
		const enteredAmount = Number(amountRef.current.value)
		if (enteredAmount < 1 || enteredAmount > 5) {
			amountRef.current.value = '1'
			return setAmountIsValid(false)
		}
		props.onAddToCart(enteredAmount)
		setAmountIsValid(true)
	}
	return (
		<form onSubmit={submitHandler} className={styles.form}>
			<Input ref={amountRef} label='Amount' input={inputProps} />
			<button type='submit'>+ Add</button>
			{!amountIsValid && (
				<p className={styles.error}>
					Please, enter a valid amount (1-5)
				</p>
			)}
		</form>
	)
}

export default MealItemForm
