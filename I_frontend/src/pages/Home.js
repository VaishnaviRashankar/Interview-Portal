// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../style/Home.css';
// import axios from 'axios';

// const Home = ({ setIsLoggedIn }) => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     password2: '',
//   });
//   const [isLogin, setIsLogin] = useState(true);
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (isLogin) {
//         // Login API Call
//         await axios.post('http://127.0.0.1:8000/api/login/', {
//           username: formData.username,
//           password: formData.password,
//         });
//         setMessage('Login successful!');
//         setIsLoggedIn(true); // Update login state
//         navigate('/interviews'); // Redirect to Interviews
//       } else {
//         // Registration API Call
//         await axios.post('http://127.0.0.1:8000/api/register/', {
//           username: formData.username,
//           email: formData.email,
//           password: formData.password,
//           password2: formData.password2,
//         });
//         setMessage('Registration successful! Please log in.');
//         setIsLogin(true);
//       }
//     } catch (error) {
//       setMessage(
//         error.response?.data?.detail || 
//         error.response?.data?.error || 
//         'An error occurred.'
//       );
//     }
//   };

//   return (
//     <div className="home">
//       <h1>{isLogin ? 'Login' : 'Register'} to the Portal</h1>
//       {message && <p className="message">{message}</p>}
//       <form onSubmit={handleSubmit} className="auth-form">
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//           required
//         />
//         {!isLogin && (
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         )}
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         {!isLogin && (
//           <input
//             type="password"
//             name="password2"
//             placeholder="Confirm Password"
//             value={formData.password2}
//             onChange={handleChange}
//             required
//           />
//         )}
//         <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
//       </form>
//       <p>
//         {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
//         <button className="toggle-button" onClick={() => setIsLogin(!isLogin)}>
//           {isLogin ? 'Register' : 'Login'}
//         </button>
//       </p>
//     </div>
//   );
// };

// export default Home;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Home.css';
import axios from 'axios';

const Home = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login API Call
        await axios.post('http://127.0.0.1:8000/api/login/', {
          username: formData.username,
          password: formData.password,
        });
        setMessage('Login successful!');
        setIsLoggedIn(true);
        navigate('/interviews'); // Redirect to Interviews
      } else {
        // Registration API Call
        await axios.post('http://127.0.0.1:8000/api/register/', {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          password2: formData.password2,
        });
        setMessage('Registration successful! Please log in.');
        setIsLogin(true);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.detail || 
        error.response?.data?.error || 
        'An error occurred.'
      );
    }
  };

  return (
    <div className="home">
      <h1>{isLogin ? 'Login' : 'Register'} to the Portal</h1>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        {!isLogin && (
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {!isLogin && (
          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            value={formData.password2}
            onChange={handleChange}
            required
          />
        )}
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <p>
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button className="toggle-button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default Home;
