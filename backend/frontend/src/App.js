import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './page/HomePage';
import LoginPage from './page/LoginPage';
import LogoutPage from './page/LogoutPage';
import GuestPage from './page/GuestPage';
import Header from './component/Header';
import CartPage from './page/CartPage';
import CheckoutPage from './page/CheckoutPage';
import PrivateRoute from './utils/PrivateRoute';
import {AuthProvider} from './context/AuthContext';
// import axios from 'axios'

function App() {

  // const [note, setNote] = useState('')

  // useEffect(() => {
  //   getNote()
  // },[])

  // const getNote = async () => {
  //   let response = await fetch('http://127.0.0.1:8000/api/')
  //   let data = await response.json()
  //   console.log('Data:', data)
  //   setNote(data.Creating_NewList)


  //   // axios 
  //   // .get("http://localhost:8000/api/") 
  //   // .then((res) => { 
  //   //     data = res.data; 
  //   //     console.log('Data:',data)
  //   //     setNote(data)
  //   // }) 
  //   // .catch((err) => {});
  // }

  return (
    <div className="">
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route exact path='/' element={<GuestPage />} />
            <Route exact path='/' element={<PrivateRoute />}>
                <Route exact path='/home' element={<HomePage />} />
            </Route>
            <Route exact path='/' element={<PrivateRoute />}>
                <Route exact path='/cart' element={<CartPage />} />
            </Route>
            <Route exact path='/' element={<PrivateRoute />}>
                <Route path='/checkout' element={<CheckoutPage/>} />
            </Route>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/logout' element={<LogoutPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
