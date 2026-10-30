import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/" + id)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Product not found.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="message">Loading...</p>;
  if (error) return <p className="message">{error}</p>;

  return (
    <div className="container">
      <Link to="/">← Back to shop</Link>
      <div className="detail">
        <img src={product.image} alt={product.name} />
        <div className="detail-info">
          <h1>{product.name}</h1>
          <p className="category">{product.category}</p>
          <p>{product.description}</p>
          <p className="price">₹{product.price}</p>
          <p>{product.stock > 0 ? product.stock + " in stock" : "Out of stock"}</p>
          <button className="detail-btn" disabled={product.stock === 0}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;