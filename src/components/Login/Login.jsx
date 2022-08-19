import { React, useState, useEffect } from 'react'
import Axios from 'axios'
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';








export default function Login(props) {

    let navigate = useNavigate();

    const [errorList, setErrorList] = useState([])
    const [error, setError] = useState("")
    let [displayUserError, setDisplayUserError] = useState({

        email: "none",
        password: "none"
    })
    const [isloading, setisLoading] = useState(false)
    const [user, setUSer] = useState({

        email: "",
        password: ""
    })






    function getUserData(e) {
        let myUSer = { ...user }// deep Copy
        myUSer[e.target.name] = e.target.value
        setUSer(myUSer)


    }

    function validateLoginForm() {
        let scheme = Joi.object({

            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: Joi.string().pattern(new RegExp('^[A-Z][a-z]{3,10}$')),
        })
        return scheme.validate(user, { abortEarly: false })
    }

    async function submitLoginForm(e) {


        setDisplayNone();
        e.preventDefault();
        setisLoading(true)
        let validationResult = validateLoginForm();

        if (validationResult.error) {

            setDisplayNone()
            setDisplayUserError(displayUserError)

            setErrorList(validationResult.error.details)
            let errors = validationResult.error.details

            errors.map(error => {



                displayUserError[error.path[0]] = "block"


            });
            setDisplayUserError(displayUserError)
            console.log(displayUserError);

            setisLoading(false);

        }
        else {
            let { data } = await Axios.post("https://route-egypt-api.herokuapp.com/signin", user)
            if (data.message == "success") { // navigate to login

                localStorage.setItem("userToken", data.token)
                setisLoading(false)
                props.saveUSerData();
                navigate('/home')
            }
            else {
                setError("Please Check Your Email Or Password")
                setisLoading(false)

            }
        }

    }
    function setDisplayNone() {


        displayUserError.email = "none"
        displayUserError.password = "none"
        setDisplayUserError(displayUserError)
        console.log(displayUserError);
    }


    return (
        <>
            <div className='w-75 mx-auto mt-5 mb-3 '>
                {/* {errorList.map((error,i)=> <div className='alert py-2 alert-danger' key={i}> {error.message} </div> )} */}
                <h2 >Login Now</h2>
                <form className='mt-3' onSubmit={submitLoginForm}>


                    <label htmlFor='email'> email : </label>
                    <input onChange={getUserData} type="email" className='form-control mb-2' id='email' name='email' />
                    <h6 className='fs-6 text-danger' style={{ display: displayUserError.email }}>email should be like "example@gmail.com" </h6>

                    <label htmlFor='password'> Password : </label>
                    <input onChange={getUserData} type="password" className='form-control mb-2' id='password' name='password' />
                    <h6 className='fs-6 text-danger' style={{ display: displayUserError.password }}>password must start with capital letter and length between 3 to 10" </h6>

                    <button type='submit' className='btn btn-outline-danger' >
                        {isloading ? <i className='fas fa-spinner fa-spin'></i> : "Login"}
                    </button>

                </form>
                {error ? <div className='alert alert-danger mt-2 fw-bold'>{error}</div> : ''}

            </div>
        </>
    )
}
