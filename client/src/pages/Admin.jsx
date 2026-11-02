import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API = "http://localhost:5000/api/products";

function Admin() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const token = localStorage.getItem("token");
  const headers = { Authorization: "Bearer " + token };

  const load = () => {
    axios.get(API).then((res) => setProducts(res.data));
  };

  useEffect(() => {
    load();
  }, []);

  if (!user) {
    return (
      <div className="container">
        <h1>Admin</h1>
        <p>Please log in.</p>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.post(
        API,
        { ...form, price: Number(form.price), stock: Number(form.stock) },
        { headers }
      );
      setForm({ name: "", description: "", price: "", category: "", image: "", stock: "" });
      setMessage("Product added");
      load();
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not add product");
    }
  };

  const removeProduct = async (id) => {
    setMessage("");
    try {
      await axios.delete(API + "/" + id, { headers });
      setMessage("Product deleted");
      load();
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not delete");
    }
  };

  return (
    <div className="container">
      <h1>Admin</h1>
      {message && <p className="error">{message}</p>}

      <form className="form-box admin-form" onSubmit={addProduct}>
        <h2>Add product</h2>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
        <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} />
        <button type="submit">Add product</button>
      </form>

      <h2>All products</h2>
      {products.map((p) => (
        <div className="cart-row" key={p._id}>
          <img src={p.image} alt={p.name} />
          <div className="cart-info">
            <h3>{p.name}</h3>
            <p>₹{p.price} · stock {p.stock}</p>
          </div>
          <button onClick={() => removeProduct(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Admin;