import React, { useState, useEffect } from 'react';
import Api from '../../Api';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast from 'react-hot-toast';
import Logo from '../../assets/images/Logo-Harmoni.png';

const Login = () => {
  // State hooks
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Navigation hook
  const navigate = useNavigate();

  // Effect hook to check for existing token
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  // Login handler
 // ...

// Login handler
const handleLogin = async () => {
  setLoading(true);

  try {
    const response = await Api.post('/api/login', {
      email,
      password,
    });

    if (response.data.roles && response.data.roles.length > 0) {
      // ... (kode lainnya tetap sama)
    } else {
      console.error('User roles not available in response');
      toast.error('Login failed. Please try again.');
    }
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);

    // Menangani pesan kesalahan dari server
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(`Login failed: ${error.response.data.message}`);
    } else {
      toast.error('Login failed. Please try again.');
    }
  } finally {
    setLoading(false);
  };
};

// ...
  return (
    <div className="w-full h-screen flex rounded-lg">
      <div className="absolute -left-10 md:-left-10 -z-10 ">
        <svg width="300" height="300" className="md:scale-125" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#789461" d="M31.2,-51.3C41.1,-42.2,50.2,-34.6,61.2,-24C72.2,-13.3,85.2,0.4,86.6,14.6C87.9,28.9,77.7,43.7,65.8,56.3C53.8,69,40.1,79.5,26.3,78.4C12.5,77.4,-1.3,64.6,-17,59.4C-32.7,54.2,-50.2,56.4,-57.6,49.2C-65,41.9,-62.3,25.3,-63,10C-63.7,-5.2,-67.7,-19,-65.9,-33.1C-64.1,-47.1,-56.4,-61.5,-44.5,-69.6C-32.5,-77.7,-16.3,-79.5,-2.8,-75.1C10.7,-70.8,21.3,-60.3,31.2,-51.3Z" transform="translate(100 100)" />
        </svg>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 m-auto h-[480px] shadow-lg shadow-green-800 sm:max-w-[850px]">
        <div className="w-full h-[480px] hidden md:block">
          <div className="w-full h-full object-cover border rounded-md">
            <img className="py-[30px]" src={Logo} alt="Harmoni Tech Logo" />
          </div>
        </div>
        <div className="p-4 flex flex-col justify-around">
          <form className="max-w-md mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
              Welcome To Si-Meet <span className="text-gray-700 mt-2">Harmoni Tech</span>
            </h2>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <div className="flex items-center text-justify">
                <span className="md:w-6">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <input
                  id="email"
                  type="text"
                  className="form-control w-full border p-2 rounded-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email Address"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <div className="flex items-center text-justify">
                <span className="md:w-6">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  id="password"
                  type="password"
                  className="form-control w-full border p-2 rounded-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                  placeholder="Enter Your Password"
                />
              </div>
            </div>
            <button
              onClick={handleLogin}
              className="w-full py-2 bg-green-600 hover:bg-green-800 rounded-md mb-4 text-[20px]"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
            <p className="text-gray-600 cursor-default px-2 text-[18px] font-semibold">Silahkan Login..</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
