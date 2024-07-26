import React, { useEffect } from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { Routes, Route} from 'react-router-dom';
import AllBooks from './pages/AllBooks';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import BookDetails from './components/BookDetails/BookDetails';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';
import Favourites from './components/Profile/Favourites';
import OrderHistory from './components/Profile/OrderHistory';
import Settings from './components/Profile/Settings';
import AllOrders from './pages/AllOrders';
import AddBook from './pages/AddBook';
import UpdateBook from './pages/UpdateBook';

const App = () => {
  
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem("id") && 
      localStorage.getItem("token") && 
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);

  return (
    <div>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/all-books" element={<AllBooks/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/profile" element={<Profile/>}>
            {role === "user" ? (<Route index element={<Favourites/>}/>) : (<Route index element={<AllOrders/>}/>)}
            {role === "admin" && <Route path='/profile/add-book' element={<AddBook/>}/>}
            <Route path='/profile/order-history' element={<OrderHistory/>}/>
            <Route path='/profile/settings' element={<Settings/>}/>
          </Route>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/sign-in" element={<Login/>}/>
          <Route path="/update-book/:id" element={<UpdateBook/>}/>
          <Route path='view-book-details/:id' element={<BookDetails/>}/>
        </Routes>
        <Footer/>
    </div>
  )
}

export default App
