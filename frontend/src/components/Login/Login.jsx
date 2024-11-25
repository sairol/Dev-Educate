import React, { useState } from 'react';
import qrTemp from "../../assets/qrTEMP.jpg"

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify({ email }));
        window.location.href = '/';
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.log(error)
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-12">
      {/* Left Section */}
      <div className="col-span-4 bg-blue-600 flex flex-col items-center justify-center text-white p-6">
        <h1 className="text-3xl font-bold mb-4">Start a dev journey <br /> in just a few seconds using <br /> DevEducate</h1>
        <p className="text-lg">Home for tech Writers and <span className='font-semibold'>Learners</span> </p>
      </div>

      {/* Right Section */}
      <div className="col-span-8 bg-gray-50 flex flex-col p-12">
        <form
          className="px-8 py-10"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Sign up/ Log in</h2>
          <p className="text-gray-600 mb-6 text-xl pb-8">
            Join the dev community of over a million active developers.
          </p>
          <div className="mb-4">
            <label className="block text-gray-700 text-xl font-bold mb-2">
              Continue with email id
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-md shadow-sm w-full text-zinc-800 py-4 px-8 text-xl leading-tight focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-xl font-bold mb-2">
              Credentials
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-md shadow-sm w-full py-4 px-8 text-xl text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className='flex justify-end'>
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-4 px-24 w-fit rounded-md hover:bg-blue-600 transition-all"
            >
              Submit
            </button>
          </div>
          <div className="text-center my-4 text-gray-500 pt-12">or continue with</div>
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              className="flex items-center justify-center w-12 h-12 border rounded-md hover:bg-gray-200 transition-all"
            >
              <img src={qrTemp} alt="Google" />
            </button>
            <button
              type="button"
              className="flex items-center justify-center w-12 h-12 border rounded-md hover:bg-gray-200 transition-all"
            >
              <img src={qrTemp} alt="Facebook" />
            </button>
            <button
              type="button"
              className="flex items-center justify-center w-12 h-12 border rounded-md hover:bg-gray-200 transition-all"
            >
              <img src={qrTemp} alt="LinkedIn" />
            </button>
            <button
              type="button"
              className="flex items-center justify-center w-12 h-12 border rounded-md hover:bg-gray-200 transition-all"
            >
              <img src={qrTemp} alt="GitHub" />
            </button>
            <button
              type="button"
              className="flex items-center justify-center w-12 h-12 border rounded-md hover:bg-gray-200 transition-all"
            >
              <img src={qrTemp} alt="Apple" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Login;
