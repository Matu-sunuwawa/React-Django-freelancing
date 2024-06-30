import {useState, useEffect, useContext} from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from '../assets/logo.png'
import AuthContext from '../context/AuthContext';

const Header = () => {

    const {auth} = useContext(AuthContext)
    const {submitLogout} = useContext(AuthContext)
    const [menu, setMenu] = useState(false)
    const {cartitems} = useContext(AuthContext)

    let changemenu = async () => {
      setMenu(!menu)
    }

  return (
    <nav className='bg-black'>
      <div className='container mx-auto flex justify-between px-4 py-6 text-white'>
        <Link to='/home'><span><img src={logo} alt="no img" /></span></Link>
        <div className='hidden lg:flex lg:space-x-4'>
          <a href="#" className="flex space-x-2 text-lg font-medium items-center px-2 hover:text-gray-200">Category</a>
          <a href="#" className="flex space-x-2 text-lg font-medium items-center px-2 hover:text-gray-200">Contact</a>
          <a href="#" className="flex space-x-2 text-lg font-medium items-center px-2 hover:text-gray-200">About</a>
          <a href="#" className="flex space-x-2 text-lg font-medium items-center px-2 hover:text-gray-200">Help</a>
        </div>
        <div className='hidden lg:flex lg:space-x-4'>
          <div className='flex'>
            <div>
              <input className="border-solid rounded-sm text-black p-1" type="text" placeholder="Search..." />
              <button className="p-1 rounded-sm text-black bg-slate-100 hover:bg-slate-300">Search</button>
            </div>
            <div className='mx-2'>
                {!auth? 
                    <Link to='/logout'><button className='p-1 text-black rounded-md bg-slate-100 hover:bg-slate-300'>Login</button></Link>:
                  <form action="" onSubmit={submitLogout}>
                    <button type='submit' className='p-1 text-black rounded-md bg-slate-100 hover:bg-slate-300'>Logout</button>
                  </form>
              }
            </div>
          </div>
          <Link to='/cart' className="flex px-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            <div>
              {!auth?
                <sup class="counting text-[#ff0000] font-medium bg-white rounded-full p-1 text-lg">0</sup>:
                <sup class="counting text-[#ff0000] font-medium bg-white rounded-full p-1 text-lg">{cartitems.get_cart_items}</sup>
            }
            </div>
          </Link>
        </div>

              {/* Menu */}

        <div className='lg:hidden'>
          <button onClick={changemenu}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
            </svg>  
          </button>
          <div className={menu? 'absolute top-0 right-0 z-50 h-full transition ease-in-out duration-300 text-left': 'absolute top-0 right-0 z-50 h-full transition ease-in-out duration-300 text-left hidden'}>
            <div className='text-white bg-gradient-to-b from-neutral-800 to-neutral-600 min-h-full'>
              <button onClick={changemenu} className='px-4 py-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>    
              </button>
              <div className='grid grid-rows-4 px-4'>
                <a href="#" class="space-x-2 rounded-xl items-center px-2 py-2 hover:text-gray-200">Category</a>
                <a href="#" class="space-x-2 rounded-xl items-center px-2 py-2 hover:text-gray-200">Contact</a>
                <a href="#" class="space-x-2 rounded-xl items-center px-2 py-2 hover:text-gray-200">About</a>
                <a href="#" class="space-x-2 rounded-xl items-center px-2 py-2 hover:text-gray-200">Help</a>
              </div>
              <div className='flex space-x-4 px-4'>
                <div>
                  <div class="flex">
                    <input class="rounded-sm border-solid text-black p-1" type="text" placeholder="Search..." />
                    <button class="p-1 text-black rounded-sm bg-slate-100 hover:bg-slate-300">Search</button>
                  </div>
                  <div class="px-2 py-4 flex">
                    {!auth? 
                      <Link to='/logout'><button className='p-1 text-black rounded-md bg-slate-100 hover:bg-slate-300'>Login</button></Link>:
                      <form action="" onSubmit={submitLogout}>
                        <button type='submit' className='p-1 text-black rounded-md bg-slate-100 hover:bg-slate-300'>Logout</button>
                      </form>
                }
                    <Link to='/cart' class="flex px-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                      </svg>
                      <div>
                        {!auth?
                          <sup class="counting text-[#ff0000] font-medium p-1 bg-white rounded-full text-lg">0</sup>:
                          <sup class="counting text-[#ff0000] font-medium p-1 bg-white rounded-full text-lg">{cartitems.get_cart_items}</sup>
                      }
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
