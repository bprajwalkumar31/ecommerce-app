import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { items, changeQty, removeFromCart, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="container">
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/">← Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Your Cart</h1>
      {items.map((i) => (
        <div className="cart-row" key={i._id}>
          <img src={i.image} alt={i.name} />
          <div className="cart-info">
            <h3>{i.name}</h3>
            <p>₹{i.price}</p>
          </div>
          <div className="cart-qty">
            <button onClick={() => changeQty(i._id, i.qty - 1)}>-</button>
            <span>{i.qty}</span>
            <button onClick={() => changeQty(i._id, i.qty + 1)}>+</button>
          </div>
          <p className="cart-sub">₹{i.price * i.qty}</p>
          <button onClick={() => removeFromCart(i._id)}>Remove</button>
        </div>
      ))}
      <h2>Total: ₹{total}</h2>
      <Link to="/">← Continue shopping</Link>
    </div>
  );
}

export default Cart;