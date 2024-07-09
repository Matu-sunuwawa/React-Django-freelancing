import React,{useState,useEffect,createContext} from 'react'

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({ children }) => {

    const [cartitems, setCartItems] = useState([])
    const [products, setProduct] = useState([])
    // const [auth, setAuth] = useState(false)
    let [auth, setAuth] = useState(()=> (localStorage.getItem('access_token') !== null)?true:false)

    let submitLogin = async (e) => {
        e.preventDefault()

        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method:"POST",
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                'username':e.target.username.value,
                'password':e.target.password.value
            })
        })
        let data = await response.json()
        console.log('Data:',data)
        console.log('Response:',response)

        if(response.status === 200){
            console.log("Auth")
            // Initialize the access & refresh token in localstorage. 
            localStorage.clear()
            localStorage.setItem('access_token', data.access)
            localStorage.setItem('refresh_token', data.refresh)
        }else {
            alert(`Login Failed With Status: ${data.status}`)
        }

        window.location.href='/home'
    }


    let submitLogout = async () => {
        try {
          localStorage.clear()
          window.location.href='/login'
        } catch (e) {
          console.log("Logout Not Working!")
        }
    }


    let updateToken = async () => {

        try {
            if (localStorage.getItem('access_token') !== null){
                let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
                    method:"POST",
                    headers: {
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify({
                        'refresh': localStorage.getItem('refresh_token')
                    })
                })
    
                let data = await response.json()
    
                if (response.status === 200) {
                    localStorage.clear()
                    localStorage.setItem('access_token', data.access)
                    localStorage.setItem('refresh_token', data.refresh)
                } else {
                    submitLogout()
                }
            }
        } catch {
            submitLogout()
        }
            
    }

    let getAuthorizationHeader = () => {
        const accessToken = localStorage.getItem('access_token')
        return {'Authorization': `Bearer ${accessToken}`}
    }

    // let getCart = async () => {

    //     try {
    //         let response = await fetch('http://127.0.0.1:8000/api/cart/', {
    //             headers: getAuthorizationHeader()
    //         })
    //         let data = await response.json()
    //         // setCartItems(data.cartitems)

    //     } catch(error) {
    //         // console.log('Error is happening at cart_items')
    //         submitLogout()
    //     }

    // }

    // let getAuthorizationHeader = () => {
    //     const accessToken = localStorage.getItem('access_token')
    //     return {'Authorization': `Bearer ${accessToken}`}
    // }

    let getProduct = async () => {

        try {
            if (localStorage.getItem('access_token') !== null) {
                let response = await fetch('http://127.0.0.1:8000/api/', {
                    headers: getAuthorizationHeader()
                })
                let data = await response.json()
                console.log('Home:', data)
                setProduct(data.products)
                setCartItems(data.cartitems)

                if (data.detail === 'Given token not valid for any token type') {
                    submitLogout()
                }

                // setCartItems(data.cartitems)
                // console.log(Array.isArray(products));
    
                // console.log(response.status)
                // console.log('response:', response)
    
                
                // if (response.status === 200) {
                //     let sum = 0
                //     cartitems.forEach(item => {
                //         sum += item.quantity
                //     })
                //     setTotal(sum)
                //     // console.log(total)
                // } else if(response.status === 401) {
                //     submitLogout();
                // }
            }
        } catch {
            // if(response.status === 200){}else{submitLogout()}
            // console.log('Error fetching data', error)
            submitLogout()
        }
    }

    // let totalCart = async (items) => {
    //     try {
    //             if (response.status === 200) {
    //                 let sum = 0;
    //                 items.forEach(item => {
    //                     sum += item.quantity
    //                 })
    //                 setTotal(sum)
    //                 console.log(total)
    //             }
    //     } catch (error) {
    //         console.log('Error fetching data', error)
    //     }
    // }

    useEffect(() => {
        // const fetchData = async () => {
        //     await getCart();
        //     // totalCart(cartitems)
        // };

        // fetchData();

        // getCart()
        // getProduct(cartitems)
        getProduct()

        let thirty = 1000 * 60 * 9   // 1000 is milisecond
        let interval = setInterval(() => {
            if(auth){
                updateToken()
            }
            
        }, thirty)

        return () => clearInterval(interval)


    },[])

    let ctx = {
        submitLogin:submitLogin,
        submitLogout:submitLogout,
        getProduct: getProduct,
        auth:auth,
        cartitems:cartitems,
        products: products,
    }

  return (
    <AuthContext.Provider value={ctx}>
        {children}
    </AuthContext.Provider>
  )
}