import {Link} from 'react-router-dom';

function Nav() {
  return (
    <div>
      <Link to="/register">Registration</Link>
      <Link to="/login">Log in</Link>
    </div>
  );
}

export default Nav;
