import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import { assets } from '../assets/assets'

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const authCheck = () => {
    setTimeout(() => {
      fetch("http://localhost:4000/api/login")
        .then((response) => response.json())
        .then((data) => {
          alert("Successfully Login");
          localStorage.setItem("user", JSON.stringify(data));
          authContext.signin(data._id, () => {
            navigate("/");
          });
        })
        .catch((err) => {
          alert("Wrong credentials, Try again");
          console.log(err);
        });
    }, 3000);
  };

  const loginUser = (e) => {
    if (form.email === "" || form.password === "") {
      alert("To login user, enter details to proceed...");
    } else {
      fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      })
        .then((result) => {
          console.log("User login", result);
        })
        .catch((error) => {
          console.log("Something went wrong ", error);
        });
    }
    authCheck();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        <div className="hidden lg:block">
          <img src={require("../assets/signup.jpg")} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-center p-8">
          <div className="mb-8 text-center">
            <img
              className="mx-auto h-12 w-auto"
              src={assets.inventory}
              alt="Your Company"
            />
            <h2 className="mt-4 text-3xl font-bold text-gray-800">Sign In to Your Account</h2>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-gray-300 p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="Email address"
                  value={form.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-gray-300 p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2">Remember me</span>
              </label>
              <span className="text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer">
                Forgot your password?
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-500 transition focus:outline-none"
              onClick={loginUser}
            >
              Sign in
            </button>

            <p className="mt-4 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link to="/register" className="text-indigo-600 hover:text-indigo-500 font-medium">
                Register now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
