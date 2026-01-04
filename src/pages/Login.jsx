import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, setUser } = use(AuthContext);

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
          confirmButtonColor: "#0ea5e9",
        });
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
          confirmButtonColor: "#0ea5e9",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 transition-colors duration-300">
      <div className="bg-base-100 shadow-2xl rounded-3xl p-8 w-full max-w-md border border-base-300">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary/10 p-4 rounded-full text-primary mb-4">
            <LogIn size={32} />
          </div>
          <h2 className="text-3xl font-bold text-base-content">Welcome Back</h2>
          <p className="text-base-content/60 text-sm mt-2 font-medium">
            Login to your StudyMate account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-base-content">
                Email Address
              </span>
            </label>
            <div className="relative">
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                // Using text-base-content ensures text is visible in all modes
                className="input input-bordered w-full pl-10 focus:input-primary text-base-content bg-base-100"
                required
              />
              <Mail
                className="absolute left-3 top-3 text-base-content/40"
                size={18}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-base-content">
                Password
              </span>
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="input input-bordered w-full pl-10 pr-10 focus:input-primary text-base-content bg-base-100"
                required
              />
              <Lock
                className="absolute left-3 top-3 text-base-content/40"
                size={18}
              />

              {/* Eye Toggle Button */}
              <button
                type="button"
                className="absolute right-3 top-3 text-primary transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="text-right">
            <button
              type="button"
              className="text-sm text-primary hover:underline font-bold"
            >
              Forgot Password?
            </button>
          </div>
          {/* Demo Credentials Box */}
          <div className="bg-base-200 p-4 rounded-2xl mb-6 border border-base-300">
            <p className="text-xs font-black uppercase opacity-50 mb-3 tracking-widest text-center">
              Quick Access for Reviewer
            </p>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  // Update these to your actual test credentials
                  const emailField = document.querySelector(
                    'input[name="email"]'
                  );
                  const passField = document.querySelector(
                    'input[name="password"]'
                  );
                  if (emailField && passField) {
                    emailField.value = "user@test.com";
                    passField.value = "Test1234";
                  }
                }}
                className="btn btn-sm btn-primary btn-outline normal-case"
              >
                Click to Auto-fill User Demo
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full text-white shadow-lg font-bold text-lg"
          >
            Login
          </button>
        </form>

        <p className="text-center text-base-content mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-black hover:underline"
          >
            Register
          </Link>
        </p>

        <div className="divider my-6 text-base-content/30 font-bold">OR</div>

        {/* Google Login */}
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline w-full gap-2 border-base-300 hover:bg-base-200 text-base-content font-bold"
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            />
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            />
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            />
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
