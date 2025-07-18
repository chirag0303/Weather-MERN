import { useState } from 'react';
import { useForm } from '../components/shared/hooks/form-hook.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/shared/hooks/use-auth.jsx';
import toast from 'react-hot-toast';
import Card from '../components/UI/Elements/Card.jsx';
import Input from '../../src/components/shared/FormElements/Input.jsx';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../components/shared/util/validators.js';
import { axiosInstance } from '../axios/axiosInstance.js';
import { ErrorToast, SuccessToast } from '../utils/toastHelper.js';

const Login = () => {

  const [formState, inputHandler] = useForm(
    {
      email: { value: '', isValid: false },
      password: { value: '', isValid: false }
    },
    false
  );

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  }

  const { isLoggedIn } = useAuth();
  const { login } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log('LOGIN FORM DATA:', formState.inputs);
    const result = await axiosInstance.post('/v1/auth/login', {
      email: formState.inputs.email.value,
      password: formState.inputs.password.value
    });
    if (result.status === 200) {
      console.log('LOGIN FORM DATA:', formState.inputs);
      login();
      window.open("/", "_self");
      SuccessToast(result.data.message);
      isLoggedIn(true);
    } else {
      ErrorToast(result.data.message);
    }
  }

  return (
    <Card className="bg-gray-900 p-6 max-w-md mx-auto mt-10 text-white">
      <h2 className="text-xl text-stone-200 mb-2">Login required</h2>
      <hr className="border-stone-600 mb-4" />
      <form onSubmit={submitHandler} className="space-y-4">
        <Input
          id="email"
          element="input"
          type="email"
          label="Email"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address"
          onInput={inputHandler}
          placeholder="yourname@example.com"
        />

        <Input
          id="password"
          element="input"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid password"
          onInput={inputHandler}
          placeholder="************"
        />

        <button
          type="button"
          onClick={togglePassword}
          className="text-sm text-blue-400 hover:underline mt-1"
        >
          {showPassword ? 'Hide Password' : 'Show password'}
        </button>

        <div className="my-3"></div>

        <Link to="/signup" className="text-blue-400 hover:underline mt-2">
          Don't have an account? Sign up
        </Link>

        <button type="submit"
          disabled={!formState.isValid}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 
            text-white rounded disabled:opacity-50">
          Login
        </button>
      </form>
    </Card >
  );
};

export default Login;