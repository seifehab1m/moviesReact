import { React, useState, useEffect } from 'react'
import Axios from 'axios'
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';



export default function Regestration() {

    let navigate = useNavigate();

    const [errorList, setErrorList] = useState([])
    const [error, setError] = useState("")
    let [displayUserError, setDisplayUserError] = useState({
            first_name: "none",
            last_name: "none",
            age: "none",
        email: "none",
        password: "none"
    })
    const [isloading, setisLoading] = useState(false)
    const [user, setUSer] = useState({
        first_name: "",
        last_name: "",
        age: 0,
        email: "",
        password: ""
    })






    function getUserData(e) {
        let myUSer = { ...user }// deep Copy
        myUSer[e.target.name] = e.target.value
        setUSer(myUSer)


    }

    function validateRegisterForm() {
        let scheme = Joi.object({
            first_name: Joi.string().alphanum().min(3).max(10).required(),
            last_name: Joi.string().alphanum().min(3).max(10).required(),
            age: Joi.number().min(16).max(80).required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: Joi.string().pattern(new RegExp('^[A-Z][a-z]{3,10}$')),
        })
        return scheme.validate(user, { abortEarly: false })
    }

    async function submitRegisterForm(e) {


         setDisplayNone();
        e.preventDefault();
        setisLoading(true)
        let validationResult = validateRegisterForm();

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
            let { data } = await Axios.post("https://route-egypt-api.herokuapp.com/signup", user)
            if (data.message == "success") { // navigate to login

                setisLoading(false)
                navigate('/login')
            }
            else {
                setError("Email is already exist")
                setisLoading(false)

            }
        }

    }
    function setDisplayNone() {

        displayUserError.first_name="none"
        displayUserError.last_name="none"
        displayUserError.age="none"
        displayUserError.email="none"
        displayUserError.password="none"
        setDisplayUserError(displayUserError)
        console.log(displayUserError);
    }


    return (
        <>
            <div className='w-75 mx-auto mt-5 mb-3 '>
                {/* {errorList.map((error,i)=> <div className='alert py-2 alert-danger' key={i}> {error.message} </div> )} */}
                <h2 >Register Now</h2>
                <form className='mt-3' onSubmit={submitRegisterForm}>
                    <label htmlFor='first_name'> First Name : </label>
                    <input onChange={getUserData} className='form-control mb-2' id='first_name' name='first_name' />
                    <h6 className='fs-6 text-danger' style={{ display: displayUserError.first_name }} >first name length must between 3 to 10 characters </h6>

                    <label htmlFor='last_name'> Last Name : </label>
                    <input onChange={getUserData} className='form-control mb-2' id='last_name' name='last_name' />
                    <h6 className='fs-6 text-danger' style={{ display: displayUserError.last_name }}>last name length must between 3 to 10 characters </h6>

                    <label htmlFor='age'> age : </label>
                    <input onChange={getUserData} type="number" className='form-control mb-2' id='age' name='age' />
                    <h6 className='fs-6 text-danger' style={{ display: displayUserError.age }}>age must between 16 to 80  </h6>

                    <label htmlFor='email'> email : </label>
                    <input onChange={getUserData} type="email" className='form-control mb-2' id='email' name='email' />
                    <h6 className='fs-6 text-danger' style={{ display: displayUserError.email }}>email should be like "example@gmail.com" </h6>

                    <label htmlFor='password'> Password : </label>
                    <input onChange={getUserData} type="password" className='form-control mb-2' id='password' name='password' />
                    <h6 className='fs-6 text-danger' style={{ display: displayUserError.password }}>password must start with capital letter and length between 3 to 10" </h6>

                    <button type='submit' className='btn btn-outline-danger' >
                        {isloading ? <i className='fas fa-spinner fa-spin'></i> : "Register"}
                    </button>

                </form>
                {error ? <div className='alert alert-danger mt-2 fw-bold'>{error}</div> : ''}

            </div>
        </>
    )
}
