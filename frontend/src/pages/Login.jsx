import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/api";


function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

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

        setError("");
        setLoading(true);

        try {

            const data = await login(formData);

            localStorage.setItem(
                "token",
                data.access_token
            );

            navigate("/dashboard");

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);
        }
    }


    return (
        <div className="auth-container">

            <div className="auth-card">

                <h1>Welcome Back</h1>

                <p>
                    Login to your account
                </p>


                <form onSubmit={handleSubmit}>

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
                            ? "Logging in..."
                            : "Login"
                        }
                    </button>

                </form>


                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}


                <p>
                    Don't have an account?

                    {" "}

                    <Link to="/signup">
                        Sign Up
                    </Link>
                </p>

            </div>

        </div>
    );
}


export default Login;