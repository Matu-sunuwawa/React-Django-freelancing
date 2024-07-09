import React, { useEffect, useState, useContext } from 'react'
import CartList from '../component/CartList';
import { Link } from 'react-router-dom';

const CartPage = () => {

  // const [data, setData] = useState([])
  const [carts, setCarts] = useState([]);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    getCart()
  }, [])

  useEffect(() => {
    if (carts && Array.isArray(carts)) {
      if (carts.length > 0) {
        setCheck(true)
      } else if (carts.length == 0) {
        setCheck(false)
      }
    }
  }, [carts]);  // The main purpose of this useEffect is to update the check state whenever the carts array changes. This ensures that the check state is always in sync with the actual length of the carts array.

  let getAuthorizationHeader = () => {
    const accessToken = localStorage.getItem('access_token')
    return {'Authorization': `Bearer ${accessToken}`}
  }

  let getCart = async () => {
    
    try {
        let response = await fetch('http://127.0.0.1:8000/api/cart/', {
          headers: getAuthorizationHeader()
        })
        let data = await response.json()
        console.log('cart:', data)
        setCarts(data.carts)
    } catch (error) {
      console.log('Error fetching data', error)
    }
  }

  return (
    <div>
      {/* <h2>{user.name}</h2>
      <h3>{user.email}</h3> */}
      <div className='container mx-auto'>
        <div className='flex justify-between'>
            <Link to='/home' className='mt-[10px] p-1 text-black rounded-md bg-slate-100 hover:bg-slate-300'>Back</Link>
            <Link to='/checkout' className='mt-[10px] p-1 text-black rounded-md bg-slate-100 hover:bg-slate-300'>Proceed to Checkout</Link>
        </div>
        {check? carts.map((cart, index) => (
          <CartList key={index} cart={cart} />
        )): <h3 className='text-center text-xl font-semibold text-[#dc2626]'>there is no product added in the cart.</h3>}
      </div>
    </div>
  )
}

export default CartPage
