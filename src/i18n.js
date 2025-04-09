// src/i18n.js

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

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

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
