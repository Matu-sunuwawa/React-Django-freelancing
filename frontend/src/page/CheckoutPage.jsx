import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CheckoutList from '../component/CheckoutList';
import cbe from '../assets/cbe.webp'
import buna from '../assets/buna.webp'
import coop from '../assets/coop.webp'
import dashen from '../assets/dashen.webp'
import telebirr from '../assets/telebirr.webp'
import awash from '../assets/awash.webp'
import abs from '../assets/abs.webp'
import zemen from '../assets/zemen.webp'

const CheckoutPage = () => {

    const [totalprice, setTotalPrice] = useState([]);
    const [user, setUser] = useState([]);
    const [carts, setCarts] = useState([]);
    const [customeraddress, setCustomerAddress] = useState([])


  useEffect(() => {
    getCheckout()
  }, [])

  let getAuthorizationHeader = () => {
    const accessToken = localStorage.getItem('access_token')
    return {'Authorization': `Bearer ${accessToken}`}
  }

  let getCheckout = async () => {
    
    try {
        let response = await fetch('http://127.0.0.1:8000/api/checkout/', {
          headers: getAuthorizationHeader()
        })
        let data = await response.json()
        console.log('checkout:', data)
        setTotalPrice(data.totalprice)
        setCarts(data.carts)
        setUser(data.user)
        setCustomerAddress(data.customeraddress)
    } catch (error) {
      console.log('Error fetching data', error)
    }
  }

  let sum = 0
  totalprice.map(items => (
    sum += items.get_total
  ))

  return (
    <section className='container mx-auto py-10 lg:py-20'>
        <Link to='/cart' className='mt-[10px] p-1 text-black rounded-md bg-slate-100 hover:bg-slate-300'>Back</Link>
        <div className='mx-auto block lg:grid lg:grid-cols-2 gap-2 bg-white px-4 py-6 lg:w-3/4'>
            <div className='grid grid-row-2 gap-4 py-4'>
                <div className='bg-white shadow-lg px-4 py-6 rounded-md'>
                    <div>
                        <h3 className='text-xl font-semibold py-2'>Review Freelancers And Hiring</h3>
                    </div>
                    {carts.map((cart, index) => (
                        <CheckoutList key={index} cart={cart} />
                    ))}
                </div>
                <div className='bg-white shadow-lg px-4 py-6 rounded-md'>
                    <div className='flex justify-between py-6'>
                            <h3 class="text-xl font-semibold">Delivery information</h3>
                            <button class="p-1 text-black text-sm font-medium rounded-xl bg-slate-100 hover:bg-slate-300">Edit Information</button>
                    </div>
                    <div className='grid grid-cols-4 gap-2'>
                        <div className='space-y-4'>
                            <h3 class="font-medium">Name:</h3>
                            <h3 class="font-medium">Address:</h3>
                            <h3 class="font-medium">City:</h3>
                            <h3 class="font-medium truncate">Zip Code:</h3>
                            <h3 class="font-medium">Mobile:</h3>
                            <h3 class="font-medium">Email:</h3>
                        </div>
                        <div className='space-y-4 col-span-3'>
                            <p class="text-slate-600">{user.name}</p>
                            {customeraddress.map(items => (
                                <div key={items.id}>
                                    <p class="text-slate-600 truncate">{items.address}</p>   
                                </div>
                            ))}
                            {customeraddress.map(items => (
                                <div key={items.id}>
                                    <p class="text-slate-600">{items.city}</p>   
                                </div>
                            ))}
                            {customeraddress.map(items => (
                                <div key={items.id}>
                                    <p class="text-slate-600">{items.postal_code}</p>   
                                </div>
                            ))}
                            {customeraddress.map(items => (
                                <div key={items.id}>
                                    <p class="text-slate-600">{items.phone_number}</p>  
                                </div>
                            ))}
                            <p class="text-slate-600 truncate">{user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white shadow-lg px-4 py-6 rounded-md'>
                <div className='pb-2'>
                    <h3 className='text-xl font-semibold'>Order Summery</h3>
                    <div>
                        <h3 className='text-xl font-semibold text-[#dc2626]'>Total Price: {sum}ETB</h3>
                    </div>
                </div>
                <hr className='px-4' />
                <div className='py-2'>
                    <h3 className='font-semibold'>Payment Details</h3>
                </div>
                <hr />
                <div className='py-2'>
                    <div className='mx-auto lg:mx-0 grid grid-cols-4 gap-2 size-1/2'>
                        <img className='' src={telebirr} alt="telebirr" />
                        <img className='' src={cbe} alt="cbe" />
                        <img className='' src={awash} alt="awash" />
                        <img className='' src={dashen} alt="dashen" />
                        <img className='' src={abs} alt="abs" />
                        <img className='' src={coop} alt="coop" />
                        <img className='' src={buna} alt="buna" />
                        <img className='' src={zemen} alt="zemen" />
                    </div>
                    <div className='py-4'>
                        <button className='p-2 w-full text-black text-sm font-medium rounded-xl bg-slate-100 hover:bg-slate-300 font-semibold text-xl'>Pay</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default CheckoutPage
