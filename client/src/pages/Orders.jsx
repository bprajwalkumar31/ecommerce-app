import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";

function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const token = localStorage.getItem("token");
    axios
      .get(`${API_URL}/api/orders/mine`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load orders");
        setLoading(false);
      });
  }, [user]);

  if (!user) {
    return (
      <div className="container">
        <h1>My Orders</h1>
        <p>Please log in to see your orders.</p>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  if (loading) return <p className="message">Loading orders...</p>;
  if (error) return <p className="message">{error}</p>;

  return (
    <div className="container">
      <h1>My Orders</h1>
      {orders.length === 0 && <p>No orders yet.</p>}
      {orders.map((o) => (
        <div className="order-box" key={o._id}>
          <p>
            <b>Order</b> {o._id.slice(-6)} · {new Date(o.createdAt).toLocaleDateString()} ·{" "}
            <b>{o.status}</b> · {o.isPaid ? "Paid" : "Not paid"}
          </p>
          {o.items.map((i) => (
            <p key={i._id}>
              {i.name} × {i.qty} = ₹{i.price * i.qty}
            </p>
          ))}
          <p>
            <b>Total: ₹{o.total}</b>
          </p>
        </div>
      ))}
    </div>
  );
}

export default Orders;