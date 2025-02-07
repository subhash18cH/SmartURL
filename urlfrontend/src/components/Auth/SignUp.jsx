import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import api from '../Api';
import toast from 'react-hot-toast';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmitHandler = async (data) => {
    const { userName, email, password } = data;
    const sendData = {
      userName,
      email,
      password,
    };

    try {
      setLoading(true);
      const response = await api.post("/api/auth/public/signup", sendData);
      reset();
      if (response.status === 200) {
        toast.success("Reagister Successful");
        navigate("/signin");
      }
    } catch (error) {
      toast.error("Something went wrong!")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg space-y-6 sm:space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#5052ce]">
            Create your account
          </h2>
          <p className="mt-2 text-sm sm:text-base text-red-500">
            Free server is being used, it will take 2 minutes to restart. Please wait after clicking on Sign Up.
          </p>
        </div>

        <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="userName" className="block text-sm sm:text-base font-semibold text-gray-700">
                UserName
              </label>
              <input
                id="userName"
                name="userName"
                type="text"
                message="*UserName is required"
                required
                placeholder="John Doe"
                {...register("userName")}
                errors={errors}
                className="mt-1 block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm sm:text-base font-semibold text-gray-700">
                Email
              </label>
              <input
                id="email"
                message="*Email is required"
                name="email"
                type="email"
                required
                {...register("email")}
                errors={errors}
                className="mt-1 block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm sm:text-base font-semibold text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                message="*Password is required"
                required
                className="mt-1 block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="*******"
                {...register("password")}
                errors={errors}
              />
            </div>
          </div>


          <div>
            <button
              disabled={loading}
              type="submit"
              className="w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent rounded-md 
              shadow-sm  sm:text-base font-semibold text-white bg-[#5052ce] hover:bg-[#6a6bd5] 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {loading ? <span>Loading...</span> : "Sign up"}
            </button>
          </div>

          <div className="text-center text-sm sm:text-base">
            <span className="text-gray-600">
              Already have an account?{' '}
              <Link to="/signin" className="hover:text-[#6a6bd5] underline font-medium transition-colors text-[#5052ce]">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;