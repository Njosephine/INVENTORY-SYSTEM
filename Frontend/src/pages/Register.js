import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UploadImage from "../components/UploadImage";
import { assets } from '../assets/assets'

function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    imageUrl: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerUser = () => {
    fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((result) => {
        alert("Successfully Registered! Now log in with your details.");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  const uploadImage = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "inventoryapp");

    await fetch("https://api.cloudinary.com/v1_1/ddhayhptm/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setForm({ ...form, imageUrl: data.url });
        alert("Image Successfully Uploaded");
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        <div className="hidden lg:block">
          <img src={require("../assets/Login.png")} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-center p-8">
          <div className="mb-6 text-center">
            <img
              className="mx-auto h-10 w-auto"
              src={assets.inventory}
              alt="Your Company"
            />
            <h2 className="mt-2 text-2xl font-semibold text-gray-800">Register Your Account</h2>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <div className="flex gap-4">
                <input
                  name="firstName"
                  type="text"
                  required
                  className="block w-full rounded-md border-gray-300 py-1 px-2 text-gray-900 text-sm shadow-sm focus:ring-1 focus:ring-indigo-500"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={handleInputChange}
                />
                <input
                  name="lastName"
                  type="text"
                  required
                  className="block w-full rounded-md border-gray-300 py-1 px-2 text-gray-900 text-sm shadow-sm focus:ring-1 focus:ring-indigo-500"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-gray-300 py-1 px-2 text-gray-900 text-sm shadow-sm focus:ring-1 focus:ring-indigo-500"
                placeholder="Email address"
                value={form.email}
                onChange={handleInputChange}
              />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-gray-300 py-1 px-2 text-gray-900 text-sm shadow-sm focus:ring-1 focus:ring-indigo-500"
                placeholder="Password"
                value={form.password}
                onChange={handleInputChange}
              />
              <input
                name="phoneNumber"
                type="number"
                autoComplete="phoneNumber"
                required
                className="block w-full rounded-md border-gray-300 py-1 px-2 text-gray-900 text-sm shadow-sm focus:ring-1 focus:ring-indigo-500"
                placeholder="Phone Number"
                value={form.phoneNumber}
                onChange={handleInputChange}
              />
              <UploadImage uploadImage={uploadImage} />
            </div>

            <div className="flex items-center justify-between mt-4">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  required
                />
                <span className="ml-2">I agree to Terms & Conditions</span>
              </label>
              <span className="text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer">
                Forgot your password?
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-500 transition focus:outline-none"
              onClick={registerUser}
            >
              Sign Up
            </button>

            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
                Sign in now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
