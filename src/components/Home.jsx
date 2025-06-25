'use client';

import React, { useState, useEffect } from 'react';
import { FaSearch, FaGithub, FaMoon, FaSun } from 'react-icons/fa';
import TemplateList from '../components/TemplateList';
import MemeEditor from '../components/MemeEditor';


export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>

      {/* Header */}
      <header className="w-full max-w-6xl px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-1 text-2xl font-extrabold">
          <span className="text-black dark:text-white">Meme</span>
          <span className="bg-orange-400 text-white rounded-xl px-3 py-1 text-base">Duniya</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white p-2 rounded-full shadow-md transition"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>

          <a
            href="https://github.com/arijiiiitttt/memehub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 transition"
          >
            <FaGithub size={22} />
          </a>

         
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-14 px-6 w-full max-w-4xl">
        <h1 className="md:text-5xl lg:text-7xl text-4xl Galter font-medium">
          Create memes in <br />
          <span className="text-orange-500">seconds</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-300 Galter mt-3">Create, Share & Rule the Meme Universe</p>
        <div className="mt-8 flex justify-center">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Search template"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-5 py-3 rounded-full Galter bg-white border-1 border-gray-500 text-black pl-6 pr-12 focus:outline-none dark:bg-gray-800 dark:text-white"
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black dark:text-white">
              <FaSearch />
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="w-full max-w-6xl px-6 pb-16 flex-grow">
        {selectedTemplate ? (
          <MemeEditor template={selectedTemplate} onBack={() => setSelectedTemplate(null)} />
        ) : (
          <TemplateList
            onTemplateSelect={handleTemplateSelect}
            searchTerm={searchTerm}
            gridClass="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center"
            nameBelowImage={true}
          />
        )}
      </main>

      <footer className="text-center Galter text-sm text-gray-400 dark:text-gray-500 pt-30 pb-3 w-full">
        build with ❤️ by <a href="https://github.com/arijiiiitttt" className="text-blue-500">Arijit</a>
      </footer>
    </div>
  );
}
