import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();

  return (
    <nav className="navbar">
      <Link to="/" className="brand">My Shop</Link>
      <div className="nav-right">
        <Link to="/cart">Cart ({count})</Link>
        {user ? (
          <>
            <span>Hi, {user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;