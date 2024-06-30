import React from 'react'

const CheckoutList = ({cart}) => {
  return (
    <div className='flex justify-between items-center'>
        <div className='grid grid-cols-2 gap-2 items-center'>
            <img className='bg-black rounded-md my-[10px] h-[100px]' src={cart.product.image} alt={cart.product.name} />
            <div className=''>
                <h3 class="text-xl font-bold">{cart.product.name}</h3>
                <p class="text-slate-600 text-xs">{cart.product.category} Level</p>
            </div>
        </div>
        <div>
            <p class="font-bold">{cart.product.price * cart.quantity}ETB</p>
            <p class="text-xs">Quantity:{cart.quantity}</p>
        </div>
    </div>
  )
}

export default CheckoutList
