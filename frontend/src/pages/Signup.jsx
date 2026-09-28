import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/api";


function Signup() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    function handleChange(event) {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }


    async function handleSubmit(event) {

        event.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {

            await signup(formData);

            setMessage(
                "Account created successfully!"
            );

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);
        }
    }


    return (
        <div className="auth-container">

            <div className="auth-card">

                <h1>Create Account</h1>

                <p>
                    Sign up to continue
                </p>


                <form onSubmit={handleSubmit}>

                    <label>
                        Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />


                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />


                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />


                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating..."
                            : "Sign Up"
                        }
                    </button>

                </form>


                {message && (
                    <p className="success">
                        {message}
                    </p>
                )}


                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}


                <p>
                    Already have an account?

                    {" "}

                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}


export default Signup;