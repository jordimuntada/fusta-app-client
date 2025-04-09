// src/pages/Home.jsx

import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import ProductCard from "../components/ProductCard";

const db = getFirestore();

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-4">Fusta App</h1>
      <p className="text-xl text-center mb-8">Venem i transformem fusta. Només cal que la recullis</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        {products.map(product => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
}
