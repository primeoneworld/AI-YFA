import React, { useState } from 'react';
import { Sun, Moon, Wallet, User, Settings, LogOut } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ darkMode, toggleDarkMode }: HeaderProps) {
  const [isWalletConnected, setIsWalletConnected] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-b transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <div className="flex flex-col">
              <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                AI-YFA
              </h1>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Yield Farming Aggregator
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
              Dashboard
            </a>
            <a href="#" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
              Pools
            </a>
            <a href="#" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
              Governance
            </a>
            <a href="#" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
              Analytics
            </a>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'} hover:scale-105 transition-all`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Wallet */}
            {isWalletConnected ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
                >
                  <Wallet size={16} />
                  <span className="hidden sm:block">cosmos1ab...xy9z</span>
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                </button>

                {showUserMenu && (
                  <div className={`absolute right-0 mt-2 w-48 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border shadow-lg`}>
                    <div className="py-2">
                      <div className={`px-4 py-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
                        Balance: 1,245.67 YFA
                      </div>
                      <div className="border-t my-1"></div>
                      <a href="#" className={`flex items-center px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                        <User size={16} className="mr-2" />
                        Profile
                      </a>
                      <a href="#" className={`flex items-center px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                        <Settings size={16} className="mr-2" />
                        Settings
                      </a>
                      <a href="#" className={`flex items-center px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                        <LogOut size={16} className="mr-2" />
                        Disconnect
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsWalletConnected(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}