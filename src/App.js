// FUSTA.APP - Minimal Online Wood Store
// Tech: React + Firebase Firestore + Stripe + i18n + Tailwind CSS

import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation, initReactI18next } from "react-i18next";
import i18n from "i18next";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Language translations
const resources = {
  en: {
    translation: {
      title: "FUSTA.APP",
      buyNow: "Buy Now",
      share: "Share this product:",
      twitter: "Twitter",
      facebook: "Facebook",
      notFound: "Product not found",
    },
  },
  es: {
    translation: {
      title: "FUSTA.APP",
      buyNow: "Comprar ahora",
      share: "Comparte este producto:",
      twitter: "Twitter",
      facebook: "Facebook",
      notFound: "Producto no encontrado",
    },
  },
  ca: {
    translation: {
      title: "FUSTA.APP",
      buyNow: "Compra ara",
      share: "Comparteix aquest producte:",
      twitter: "Twitter",
      facebook: "Facebook",
      notFound: "Producte no trobat",
    },
  },
};

// Init i18n
i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

const ProductCard = ({ product }) => (
  <div className="border rounded-xl p-4 shadow hover:shadow-lg transition">
    <Link to={`/product/${product.id}`}>
      <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded" />
      <h2 className="text-xl font-semibold mt-2">{product.title}</h2>
      <p className="text-gray-600">${(product.price / 100).toFixed(2)}</p>
    </Link>
  </div>
);

const ProductPage = () => {
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
};

const Home = () => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {products.map(product => <ProductCard key={product.id} product={product} />)}
    </div>
  );
};

const LanguageSwitcher = () => {
  const changeLanguage = lng => i18n.changeLanguage(lng);
  return (
    <div className="text-center space-x-2 text-sm">
      <button onClick={() => changeLanguage("en")} className="hover:underline">EN</button>
      <button onClick={() => changeLanguage("es")} className="hover:underline">ES</button>
      <button onClick={() => changeLanguage("ca")} className="hover:underline">CA</button>
    </div>
  );
};

export default function App() {
  const { t } = useTranslation();

  return (
    <Router>
      <div className="max-w-5xl mx-auto">
        <header className="p-6 text-center">
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <LanguageSwitcher />
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </div>
    </Router>
  );
}
