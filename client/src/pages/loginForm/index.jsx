import { useForm } from 'react-hook-form';
import axios from 'axios';

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3345/login', data);
      localStorage.setItem('token', response.data.token); // Сохраняем JWT токен в localStorage
      alert('Success! User registered');
    } catch (err) {
      alert(err.response.data.message || 'Something went wrong!');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input
          {...register('email', {
            required: 'field is required',
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          {...register('password', { required: 'field is required' })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit">Log in</button>
    </form>
  );
}

export default LoginForm;
