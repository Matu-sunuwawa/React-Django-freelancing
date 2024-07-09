import {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'
import student from '../assets/studentlogo.png'
import logo from '../assets/logo.png'
import cbe from '../assets/cbe.webp'
import buna from '../assets/buna.webp'
import coop from '../assets/coop.webp'
import dashen from '../assets/dashen.webp'
import telebirr from '../assets/telebirr.webp'
import awash from '../assets/awash.webp'
import abs from '../assets/abs.webp'
import zemen from '../assets/zemen.webp'
import Accordion from '../component/Accordion'

const GuestPage = () => {

    const {auth} = useContext(AuthContext)

    const accordionData = [
        {
            title: 'Lorem1',
            content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque excepturi rem saepe sequi repudiandae sed, at dolor velit a molestiae.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque excepturi rem saepe sequi repudiandae sed, at dolor velit a molestiae.`
        },
        {
            title: 'Lorem2',
            content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque excepturi rem saepe sequi repudiandae sed, at dolor velit a molestiae.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque excepturi rem saepe sequi repudiandae sed, at dolor velit a molestiae.`
        },
        {
            title: 'Lorem3',
            content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque excepturi rem saepe sequi repudiandae sed, at dolor velit a molestiae.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque excepturi rem saepe sequi repudiandae sed, at dolor velit a molestiae.`
        },
    ]

  return (
    <div>
        {!auth?
        <Outlet />
        :<Navigate to='/home' />}
        <section className='bg-cyan-500 bg-gradient-to-r from-neutral-800 to-neutral-600 py-6 lg:py-0'>
            <div className='container mx-auto flex justify-between items-center text-center'>
                <div className='px-4 lg:w-1/2 text-4xl font-medium text-white'>
                    <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque excepturi rem saepe sequi repudiandae sed, at dolor velit a molestiae.</h2>
                </div>
                <div className='hidden lg:block'>
                    <img src={student} alt="noimg" />
                </div>
            </div>
        </section>

        {/* How It Works */}

        <section className='container mx-auto mb-10 lg:py-32 lg:w-1/2'>
            <header className='text-3xl font-medium py-6'>
                <h3>How It Works?</h3>
            </header>
            <div className='bg-neutral'>
                {accordionData.map(({title,content}) => (
                    <Accordion title={title} content={content} />
                ))}
            </div>
        </section>

        {/* footer */}

        <section className='bg-black text-white'>
            <footer className='container mx-auto lg:grid grid-cols-2 lg:gap-4 py-6 px-4'>
                <div className='py-6 text-center lg:text-left'>
                    <div className='grid lg:grid-row-3 lg:gap-4'>
                        <img src={logo} alt="olla logo" />
                        <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni, tempora!</span>
                        <div className='hidden lg:grid lg:grid-row-2 lg:gap-4 py-6'>
                            <strong>Accepted Payment</strong>
                            <div className='mx-auto lg:mx-0 grid grid-cols-4 gap-2 size-1/2'>
                                <img src={telebirr} alt="telebirr" />
                                <img src={cbe} alt="cbe" />
                                <img src={awash} alt="awash" />
                                <img src={dashen} alt="dashen" />
                                <img src={abs} alt="abyssinia" />
                                <img src={coop} alt="coop" />
                                <img src={buna} alt="buna bank" />
                                <img src={zemen} alt="zemen bank" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-4 gap-4">
                    <div>
                        <strong>Category</strong>
                        <div class="text-sm py-4 grid grid-row-10 gap-2">
                            <p class="transition ease-in-out duration-150 hover:text-black translate-x-0 hover:translate-x-2">Kg-level</p>
                            <p class="transition ease-in-out duration-150 hover:text-black translate-x-0 hover:translate-x-2">Elementery-level</p>
                            <p class="transition ease-in-out duration-150 hover:text-black translate-x-0 hover:translate-x-2">High-School-level</p>
                            <p class="transition ease-in-out duration-150 hover:text-black translate-x-0 hover:translate-x-2">University-level(Under-Graduate)</p>
                            <p class="transition ease-in-out duration-150 hover:text-black translate-x-0 hover:translate-x-2">MSC</p>
                            <p class="transition ease-in-out duration-150 hover:text-black translate-x-0 hover:translate-x-2">PHD</p>
                        </div>
                    </div>
                    <div>
                        <strong>Contact</strong>
                        <div class="text-sm py-4 grid grid-row-10 gap-2">
                            <p class="transition ease-in-out duration-150 hover:text-black translate-x-0 hover:translate-x-2">Location</p>
                            <p class="transition ease-in-out duration-150 hover:text-black translate-x-0 hover:translate-x-2">Email</p>
                            <p class="transition ease-in-out duration-150 hover:text-black translate-x-0 hover:translate-x-2">Address</p>
                            <p class="transition ease-in-out duration-150 hover:text-black translate-x-0 hover:translate-x-2">Where We Are?</p>
                        </div>
                    </div>
                    <div>
                        <strong>About</strong>
                        <div class="text-sm py-4 grid grid-row-10 gap-2">
                            <p class="transition ease-in-out duration-150 hover:text-black translate-x-0 hover:translate-x-2">About shopcart</p>
                            <p class="transition ease-in-out duration-150 hover:text-black translate-x-0 hover:translate-x-2">Careers</p>
                            <p class="transition ease-in-out duration-150 hover:text-black translate-x-0 hover:translate-x-2">News & Blog</p>
                            <p class="transition ease-in-out duration-150 hover:text-black translate-x-0 hover:translate-x-2">Help</p>
                            <p class="transition ease-in-out duration-150 hover:text-black translate-x-0 hover:translate-x-2">Press Center</p>
                            <p class="transition ease-in-out duration-150 hover:text-black translate-x-0 hover:translate-x-2">Get Freelancers by location</p>
                            <p class="transition ease-in-out duration-150 hover:text-black translate-x-0 hover:translate-x-2">Top Freelancers</p>
                            <p class="transition ease-in-out duration-150 hover:text-black translate-x-0 hover:translate-x-2">Affiliate & Partners</p>
                            <p class="transition ease-in-out duration-150 hover:text-black translate-x-0 hover:translate-x-2">Ideas & Guides</p>
                        </div>
                    </div>
                    <div>
                        <strong>Help</strong>
                        <div class="text-sm py-4 grid grid-row-10 gap-2">
                            <p class="transition ease-in-out duration-150 hover:text-black translate-x-0 hover:translate-x-2">Shopcart Help</p>
                            <p class="transition ease-in-out duration-150 hover:text-black translate-x-0 hover:translate-x-2">Returns</p>
                            <p class="transition ease-in-out duration-150 hover:text-black translate-x-0 hover:translate-x-2">track orders</p>
                            <p class="transition ease-in-out duration-150 hover:text-black translate-x-0 hover:translate-x-2">contact us</p>
                            <p class="transition ease-in-out duration-150 hover:text-black translate-x-0 hover:translate-x-2">feedback</p>
                            <p class="transition ease-in-out duration-150 hover:text-black translate-x-0 hover:translate-x-2">Security & Fraud</p>
                        </div>
                    </div>
                </div>
                <div className='text-center grid grid-row-2 gap-4 py-10 lg:hidden'>
                        <strong>Accepted Payment</strong>
                        <div className='mx-auto lg:mx-0 grid grid-cols-4 gap-2 size-1/2'>
                                <img src={telebirr} alt="telebirr" />
                                <img src={cbe} alt="cbe" />
                                <img src={awash} alt="awash" />
                                <img src={dashen} alt="dashen" />
                                <img src={abs} alt="abyssinia" />
                                <img src={coop} alt="coop" />
                                <img src={buna} alt="buna bank" />
                                <img src={zemen} alt="Zemen bank" />
                        </div>
                </div>
            </footer>
        </section>
    </div>
  )
}

export default GuestPage
