// src/pages/AdminDashboard.jsx

import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore();
const storage = getStorage();
const auth = getAuth();

export default function AdminDashboard() {
  const [product, setProduct] = useState({ title: "", description: "", price: 0, image: "" });
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (firebaseUser) => {
    setUser(firebaseUser);
  });

  const handleUploadImage = async () => {
    if (!file) return;
    const storageRef = ref(storage, `product-images/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setProduct(prev => ({ ...prev, image: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "products"), {
      ...product,
      price: parseInt(product.price, 10),
    });
    alert("Product added!");
    setProduct({ title: "", description: "", price: 0, image: "" });
    setFile(null);
  };

  if (!user) return <div className="p-6 text-center text-lg">Admin login required</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold">Add New Product</h2>
      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 border"
        value={product.title}
        onChange={(e) => setProduct({ ...product, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        className="w-full p-2 border"
        value={product.description}
        onChange={(e) => setProduct({ ...product, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price (in cents)"
        className="w-full p-2 border"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="button" onClick={handleUploadImage} className="bg-blue-600 text-white px-4 py-2 rounded">
        Upload Image
      </button>
      {product.image && (
        <img src={product.image} alt="preview" className="w-full h-40 object-contain" />
      )}
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save Product</button>
    </form>
  );
}
