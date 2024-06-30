import React, { useEffect, useState, useContext } from 'react'
import CartList from '../component/CartList';
import { Link } from 'react-router-dom';

const CartPage = () => {

  // const [data, setData] = useState([])
  const [order, setOrder] = useState([]);
  const [user, setUser] = useState([]);
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    getCart()
  }, [])

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
        setOrder(data.order)
        setCarts(data.carts)
        setUser(data.user)
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
        {carts.map((cart, index) => (
          <CartList key={index} cart={cart} />
        ))}
      </div>
    </div>
  )
}

export default CartPage
