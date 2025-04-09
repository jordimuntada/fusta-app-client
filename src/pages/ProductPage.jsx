// src/pages/ProductPage.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";

const db = getFirestore();

export default function ProductPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() });
      }
    };
    fetchProduct();
  }, [id]);

  const shareUrl = window.location.href;

  if (!product) return <div className="p-6 text-xl">{t("notFound")}</div>;

  return (
    <div className="p-4">
      <img src={product.image} alt={product.title} className="w-full max-w-xl mx-auto rounded-lg" />
      <h1 className="text-3xl font-bold mt-4">{product.title}</h1>
      <p className="text-lg text-gray-700 mt-2">{product.description}</p>
      <p className="text-xl mt-4 font-semibold">${(product.price / 100).toFixed(2)}</p>
      <button className="mt-6 px-4 py-2 bg-black text-white rounded">{t("buyNow")}</button>
      <div className="mt-6">
        <p className="font-medium mb-2">{t("share")}</p>
        <a href={`https://twitter.com/intent/tweet?url=${shareUrl}`} target="_blank" rel="noreferrer" className="mr-2 text-blue-600">{t("twitter")}</a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noreferrer" className="text-blue-800">{t("facebook")}</a>
      </div>
    </div>
  );
}
