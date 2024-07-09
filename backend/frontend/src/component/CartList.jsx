import {useState,useEffect,createContext} from 'react'

const CartList = ({cart}) => {

    let getAuthorizationHeader = () => {
        const accessToken = localStorage.getItem('access_token')
        return `Bearer ${accessToken}`
    }

    let updateCart = async (takeaction) => {

        try {
            if (localStorage.getItem('access_token') !== null) {
                fetch('http://127.0.0.1:8000/api/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: getAuthorizationHeader(),
                    },
                    body: JSON.stringify({
                        productId: cart.product.id,
                        action: takeaction
                    })
                })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error(error));
            }
            window.location.reload()
        } catch (error) {
            console.log('error:', error)
        }
    }

    let addAction = async () => {
        let takeaction = 'add'
        updateCart(takeaction)
    }
    let removeAction = async () => {
        let takeaction = 'remove'
        updateCart(takeaction)
    }

  return (
    <section>
        <div className='items-center justify-between flex'>
            <div className='flex items-center justify-between'>
                <img className='bg-black rounded-md my-[10px] mr-[10px] h-[200px]' src={cart.product.image} alt={cart.product.name} />
                <p>{cart.product.name}</p>
            </div>
            <p>
                <div class="mx-auto hidden lg:flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 fill-[#ea580c] fill-1/2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg> 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 fill-[#ea580c]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg> 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 fill-[#ea580c]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg> 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 fill-[#ea580c]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg> 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 fill-[#ea580c]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>                              
                </div>
            </p>
            <p>{cart.product.price * cart.quantity}ETB</p>
            <div class="text-center md:flex md:space-x-4 lg:block">
                <div class="pb-1">
                    <p class="text-white">Number Of Students?</p>
                </div>
                <div class="flex justify-center">
                    <p><button onClick={removeAction} class="p-2 text-black rounded-md bg-slate-100 hover:bg-slate-300">-</button></p>
                    <p><button class="p-2">{cart.quantity}</button></p>
                    <p><button onClick={addAction} class="p-2 text-black rounded-md bg-slate-100 hover:bg-slate-300">+</button></p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default CartList
