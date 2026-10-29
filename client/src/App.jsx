import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load products. Is the server running?");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="message">Loading products...</p>;
  if (error) return <p className="message">{error}</p>;

  return (
    <div className="container">
      <h1>My Shop</h1>
      <div className="grid">
        {products.map((p) => (
          <div className="card" key={p._id}>
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p className="category">{p.category}</p>
            <p className="desc">{p.description}</p>
            <p className="price">₹{p.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;