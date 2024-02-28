import './component2.css'
import React, {useRef, useState} from "react";
import {useAuth} from "../Context/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import {singInGoogle, singInGitHub} from "../firebase"


const SignUp = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {signup} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    async function handleSubmit(e) {
        e.preventDefault() //prevent tje form from refreshing

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
            // window.alert("PASS DO NOT MATCH")
        }

        try {
            setError('')
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate('/Account')
        } catch {
            setError('Failed to create an account')
        }
        setLoading(false)
    }



    return (
        <div className="form-container">
            <p className="title">Sign Up</p>
            {/*{currentUser.email}*/}
            {error && <div className="error-message">
                {error}
            </div>}

            <form className="form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Email</label>
                    <div>
                    <input type="email" name="email" placeholder="" ref={emailRef}/>
                    </div>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="" ref={passwordRef}/>

                </div>
                <div className="input-group">
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" name="password" id="password" placeholder="" ref={passwordConfirmRef}/>
                    <br/><br/>
                </div>
                <button className="sign" disabled={loading}>Sign Up</button>
            </form>
            <div className="social-message">
                <div className="line"></div>
                <p className="message">Sign Up with social accounts</p>
                <div className="line"></div>
            </div>
            <div className="social-icons">
                <button aria-label="Log in with Google" className="icon" onClick={singInGoogle}>
                    {navigate('/Account')}

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                        <path
                            d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                    </svg>
                </button>

                <button aria-label="Log in with GitHub" className="icon" onClick={singInGitHub}>
                    {navigate('/Account')}

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                        <path
                            d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                    </svg>
                </button>
            </div>
            <p className="signup">Have an account? <Link rel="noopener noreferrer" to="/LogIn" className="">Log In</Link>
            </p>
        </div>
    )
}


export default SignUp;