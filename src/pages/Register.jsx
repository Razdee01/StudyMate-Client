import React, { use } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const Register = () => {
  const { signInWithGoogle, createUser, setUser } = use(AuthContext);
  const handleGoogleSignIn=()=>{
    signInWithGoogle()
      .then((result) => {
       setUser(result);
       Swal.fire({
         icon: "success",
         title: "Registration Successful!",
         showConfirmButton: false,
         timer: 2000,
       });
       navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message,
        });
      });
  }
  const navigate = useNavigate();
  const handleRegister=(e)=>{
    e.preventDefault();
    const form=e.target;
    // const name=form.name.value;
    // const photoURL=form.photoURL.value;
    const email=form.email.value;
    const password=form.password.value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must have at least 1 uppercase, 1 lowercase, and be at least 6 characters long.",
      });
      return;
    }


    createUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/");
      })
      .catch((error) => {
       
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message,
        });
      });
  
  } 
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            StudyMate Register
          </h2>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Photo URL
              </label>
              <input
                name="photoURL"
                type="text"
                placeholder="Enter your photo URL"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
           
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
            >
              Register
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 hover:underline">
              Login
            </Link>
          </p>

          {/* OR divider */}
          <div className="flex items-center my-4">
            <hr className="grow border-gray-300" />
            <span className="mx-2 text-gray-400">OR</span>
            <hr className="grow border-gray-300" />
          </div>

          {/* Google Login Button */}
          <button 
          onClick={handleGoogleSignIn}
          className="btn bg-white text-black border-[#e5e5e5] w-full">
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
