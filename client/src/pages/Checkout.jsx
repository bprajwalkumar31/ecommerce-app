import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { API_URL } from "../config";

function Checkout() {
  const { user } = useAuth();
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="container">
        <h1>Checkout</h1>
        <p>Please log in to place an order.</p>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container">
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
        <Link to="/">← Continue shopping</Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (Object.values(form).some((v) => !v.trim())) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/api/orders`,
        {
          items: items.map((i) => ({ _id: i._id, qty: i.qty })),
          shippingAddress: form,
        },
        { headers: { Authorization: "Bearer " + token } }
      );
      clearCart();
      navigate("/orders");
    } catch (err) {
      setError(err.response?.data?.message || "Could not place order");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Checkout</h1>
      <div className="checkout">
        <form className="form-box checkout-form" onSubmit={handleSubmit}>
          <h2>Shipping address</h2>
          {error && <p className="error">{error}</p>}
          <input name="fullName" placeholder="Full name" value={form.fullName} onChange={handleChange} />
          <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
          <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
          <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
          <button type="submit" disabled={loading}>
            {loading ? "Placing order..." : "Place Order"}
          </button>
        </form>

        <div className="summary">
          <h2>Order summary</h2>
          {items.map((i) => (
            <p key={i._id}>
              {i.name} × {i.qty} = ₹{i.price * i.qty}
            </p>
          ))}
          <h3>Total: ₹{total}</h3>
        </div>
      </div>
    </div>
  );
}

export default Checkout;