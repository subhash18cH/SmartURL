import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import api from '../Api';
import toast from 'react-hot-toast';

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
   
  } = useForm({
    defaultValues: {
      userName: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onLoginHandler = async (data) => {
    try {
      setLoading(true);
      const response = await api.post("/api/auth/public/signin", data);
      if (response.status === 200) {
        toast.success("Login Successful");
        reset()
        localStorage.setItem("JWT", response.data.jwtToken);
        navigate("/home");
      }
      else {
        toast.error("something went wrong!")
      }
    } catch (error) {
      toast.error("something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#5052ce]">
            Welcome back
          </h2>
          <p className="mt-2 text-sm sm:text-base text-red-500">
            Free server is being used, it will take 2 minutes to restart. Please wait after clicking on Log In.
          </p>
        </div>

        <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-6" onSubmit={handleSubmit(onLoginHandler)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="userName" className="block text-sm font-semibold text-gray-700">
                UserName
              </label>
              <input
                id="userName"
                name="userName"
                type="text"
                {...register("userName")}
                
                required
                className="mt-1 block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="john doe"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                {...register("password")}
              
                className="mt-1 block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="********"
              />
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              type="submit"
              className="w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent rounded-md
              shadow-sm sm:text-base font-semibold text-white bg-[#5052ce] hover:bg-[#6a6bd5]
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {loading ? <span>Loading...</span> : "Log In"}
            </button>
          </div>

          <p className="text-center text-sm sm:text-base text-slate-700 mt-4 sm:mt-6">
            Don't have an account?{" "}
            <Link
              className="font-semibold underline hover:text-[#6a6bd5] transition-colors text-[#5052ce]"
              to="/signup"
            >
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;