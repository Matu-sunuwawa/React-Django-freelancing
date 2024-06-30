import React from 'react'

const ProductList = ({product}) => {

    console.log('productId:', product.id)

    let getAuthorizationHeader = () => {
        const accessToken = localStorage.getItem('access_token')
        return `Bearer ${accessToken}`
    }

    let addToCart = async () => {

        try {
            if (localStorage.getItem('access_token') !== null) {
                fetch('http://127.0.0.1:8000/api/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: getAuthorizationHeader(),
                    },
                    body: JSON.stringify({
                        productId: product.id,
                        action:'add'
                    })
                })
                // let data = await response.json()
                // console.log('authData:', data)
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error(error));
            }
            window.location.reload()
        } catch {
            submitLogout()
        }
    }


  return (
    <div>
        <div className='hidden lg:block lg:my-[20px] text-center'>
            <img className='bg-black rounded-md' src={product.image} alt={product.name} />
            <div className='flex justify-between'>
                <p>Name:</p>
                <p>{product.name}</p>
            </div>
            <div className='flex justify-between'>
                <p>Price:</p>
                <p>{product.price}ETB</p>
            </div>
            <div className='flex justify-between'>
                <p>Category:</p>
                <p>{product.category} Level</p>
            </div>
            <div className='flex justify-between'>
                <p>About:</p>
                <p>{product.about}</p>
            </div>
            <button onClick={addToCart} className='mt-[10px] p-1 text-black rounded-md bg-slate-100 hover:bg-slate-300'>Add To Cart</button>
        </div>
        <div className='lg:hidden my-[20px] text-center'>
            <img className='bg-black rounded-md' src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <p>{product.price}ETB</p>
            <p>{product.category} Level</p>
            <p>{product.about}</p>
            <button onClick={addToCart} className='mt-[10px] p-1 text-black rounded-md bg-slate-100 hover:bg-slate-300'>Add To Cart</button>
        </div>
    </div>
  )
}

export default ProductList
