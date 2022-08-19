import './App.css';
import { useState, useEffect } from 'react';
import Navbar from './../../../react/movies/src/components/Navbar/Navbar';
import Home from './components/Home/Home';
import People from './components/People/People';
import Movies from './components/Movies/Movies';
import About from './components/About/About';
import Login from './components/Login/Login';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import Tv from './components/Tv/Tv';
import Contacts from './components/Contacts/Contacts';
import Regestration from './components/Registeration/Regestration';

import jwtDecode from 'jwt-decode';
import MoviesDetails from './components/MoviesDetails/MoviesDetails';
import CounterContextProvider from './components/Context/Store';
import As from './components/As';
import Bs from './components/Bs';
import {Provider} from 'react-redux';
import { counterStore } from './components/Redux/Store';






function App() {


  let navigate = useNavigate();
  const [userData, setuserData] = useState(null)
  function saveUSerData() {
    let encodedToken = localStorage.getItem('userToken')
    let decodedToken = jwtDecode(encodedToken);
    setuserData(decodedToken)
  }

  function ProtectedRoute(props) {
    if (localStorage.getItem("userToken") === null) {
      return <Navigate to={"/login"} />
    }
    else {
      return props.children
    }

  }
  function logout() {
    setuserData(null)
    localStorage.removeItem("userToken")
    navigate('/login')
  }
  // 34an reload
  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      saveUSerData()
    }


  }, [])

  return (
    < >
      <Navbar userData={userData} logout={logout} />

      <div className='container-fluid'>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='people' element={<ProtectedRoute><People /></ProtectedRoute>} />
          <Route path='movies' element={<ProtectedRoute><Movies /></ProtectedRoute>} />
          <Route path='moviesDetails' element={<ProtectedRoute><MoviesDetails /></ProtectedRoute>} >
            <Route path=':id' element={<ProtectedRoute><MoviesDetails /></ProtectedRoute>} />

          </Route>

          <Route path='tv' element={<ProtectedRoute><Tv /></ProtectedRoute>} />
          <Route path='about' element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path='contact' element={<ProtectedRoute><Contacts /></ProtectedRoute>} />

          <Route path='tv' element={<ProtectedRoute><Tv /></ProtectedRoute>} />
          <Route path='login' element={<Login saveUSerData={saveUSerData} />} />
          <Route path='register' element={<Regestration />} />
          <Route path='*' element={<NotFound />} />


        </Routes>
        {/* //-------- context---------------- */}

        {/* <CounterContextProvider>
          <As />
          <Bs />
        </CounterContextProvider> */}
        {/* //-------- end context---------------- */}


        {/* //-------- start redux---------------- */}

        {/* <Provider store={counterStore}>
        <As />
        <Bs />
        </Provider> */}
        {/* //-------- end redux---------------- */}

        {/* <Label/> */}
      </div>
    </>
  );
}

export default App;
