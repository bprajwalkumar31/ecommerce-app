import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

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

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || p.category === category)
  );

  return (
    <div className="container">
      <h1>My Shop</h1>
      <input
        className="search"
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="categories">
        {categories.map((c) => (
          <button
            key={c}
            className={c === category ? "cat active" : "cat"}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid">
        {filtered.map((p) => (
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