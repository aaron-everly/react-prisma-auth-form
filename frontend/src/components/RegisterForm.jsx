import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 

export function RegisterForm({ user, setUser }) {

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate("/login");

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            username: username,
            password: password
        })  
      };

    async function register(e) {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/register", options)

            if (response.status === 409) {
                console.error("User not found (409)");
                alert("This email is already in use.");
                return; 
            }
    
            if (response.status === 406) {
                console.error("Unauthorized (401)");
                alert("Form is incomplete");
                return; 
            }
    
            if (!response.ok) {
                if (response.status === 500) {
                    console.error("Internal Server Error (500)");
                } else {
                    throw new Error("Network response was not ok");
                }
            }

            setEmail("");
            setUsername("");
            setPassword("");

            goToHomePage();

        } catch (error) {
            console.error("Error during login:", error);
        }
    }

    function goToHomePage() {
        navigate("/home")
    }

    function togglePassword() {
        setShowPassword(!showPassword);
    }

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg text-center my-2">
                <h1 className="text-2xl font-bold sm:text-3xl">Register</h1>

                <p className="mt-4 text-gray-500">
                    Are you ready to register for my app? <br/>
                    Create your account below. <br />
                    Start your journey today!
                </p>
            </div>
            <form className="group mx-auto mb-0 mt-8 max-w-md" noValidate>
                <div className="my-4">
                    <label htmlFor="email" className="font-medium py-4">Email</label>
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            className="
                                w-full rounded-lg border p-4 pe-12 text-sm shadow-sm
                                peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                            placeholder="you@arethebest.com"
                            required
                            pattern="/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                            value={email}
                            onChange={event => setEmail(event.target.value)} 
                        />
                        <span className="hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                            Please enter a valid email address.
                        </span>
                    </div>
                </div>
                <div>
                        <label htmlFor="username" className="font-medium">Username</label>
                    <div className="relative">
                    <input
                        type="text"
                        name="username"
                        className="
                            w-full rounded-lg border p-4 pe-12 text-sm shadow-sm"
                        placeholder="Enter username"
                        value={username}
                        onChange={event => setUsername(event.target.value)} 
                        required
                    />

                </div>
            </div>

            <div className="my-4">
                <div className="my-1">
                    <label htmlFor="password" className="font-medium">Password</label>
                </div>
             <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className="
                            w-full rounded-lg border p-4 pe-12 text-sm shadow-sm
                            invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                        placeholder="Enter password"
                        value={password}
                        onChange={event => setPassword(event.target.value)} 
                        required
                    />
                    <span onClick={togglePassword} className="absolute inset-y-0 end-0 grid place-content-center px-4">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                        </svg>
                    </span>
                </div>
            </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Already have an account?
            <Link to="/login" className="underline ml-2">Login</Link>
            </p>

            <button
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white group-invalid:pointer-events-none group-invalid:opacity-50"
              onClick={register}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    )
}