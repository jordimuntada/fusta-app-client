// src/components/LanguageSwitcher.jsx

import i18n from "i18next";

export default function LanguageSwitcher() {
  const changeLanguage = lng => i18n.changeLanguage(lng);

  return (
    <div className="text-center space-x-2 text-sm">
      <button onClick={() => changeLanguage("en")} className="hover:underline">EN</button>
      <button onClick={() => changeLanguage("es")} className="hover:underline">ES</button>
      <button onClick={() => changeLanguage("ca")} className="hover:underline">CA</button>
    </div>
  );
}
