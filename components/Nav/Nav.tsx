"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { navigationItems } from "./config/navigationItems";
import { ThemeToggle } from "./ThemeToggle";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-primary-foreground/95 backdrop-blur-sm border-b border-border">
        <div className="w-full px-1 sm:px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-between min-h-[100px] md:min-h-[120px] gap-4">
            {/* Left Logo */}
            <div className="flex-shrink-0">
              <Image
                src="/rightLogo.jpg"
                alt="Left Logo"
                width={60}
                height={60}
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16"
                priority
              />
            </div>

            {/* Center Text Content - Takes remaining space */}
            <div className="flex-1 px-2 sm:px-4 md:px-6 lg:px-8">
              <div className="flex flex-col justify-center items-center h-full space-y-1">
                <h2 className="text-sm sm:text-success md:text-lg lg:text-xl xl:text-2xl font-semibold text-blue-600 text-center leading-tight">
                  Ministiere des Sports et des Loisirs
                </h2>

                <h3 className="text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl font-medium text-foreground text-center leading-tight">
                  Federation Togolaise de football
                </h3>

                <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-4xl font-bold text-primary text-center leading-tight max-w-full">
                  LIGUE REGIONALE DE FOOTBALL LOME-GOLFE
                </h1>
              </div>
            </div>

            {/* Right Side - Logo and Menu Button */}
            <div className="flex-shrink-0">
              <div className="flex flex-col items-center">
                {/* Right Logo */}
                <Image
                  src="/rightLogo.jpg"
                  alt="Right Logo"
                  width={60}
                  height={60}
                  className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16"
                  priority
                />

                {/* Menu Button - Below Logo */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="relative p-2 rounded-md focus:outline-none mt-1"
                  aria-label="Toggle navigation menu"
                  aria-expanded={isMenuOpen}
                >
                  <div className="w-5 h-5 relative">
                    <Menu
                      className={`absolute inset-0 transition-all duration-200 ${isMenuOpen ? "opacity-0 rotate-180" : "opacity-100 rotate-0"}`}
                    />
                    <X
                      className={`absolute inset-0 transition-all duration-200 ${isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"}`}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dropdown Menu - Improved positioning and animation */}
        <div
          className={`absolute top-full right-0 w-full sm:w-50 sm:right-4 bg-background/98 backdrop-blur-md border border-border rounded-none sm:rounded-lg shadow-lg transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-2 invisible"
          }`}
        >
          <div className="p-4 space-y-1">
            {/* Theme Toggle */}
            <div className="pb-2 border-b border-border/50">
              <ThemeToggle />
            </div>

            {/* Navigation Items */}
            <div className="space-y-1">
              {navigationItems.map((item, index) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="block px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 text-foreground hover:bg-primary-dim hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  style={{
                    animationDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Spacer */}
      <div className="h-[100px] md:h-[120px]" />
    </>
  );
};

export default Nav;
