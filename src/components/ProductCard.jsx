// src/components/ProductCard.jsx

import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded" />
        <h2 className="text-xl font-semibold mt-2">{product.title}</h2>
        <p className="text-gray-600">${(product.price / 100).toFixed(2)}</p>
      </Link>
    </div>
  );
}
