'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const menuItems = [
    {
      label: 'About Us',
      href: '/about',
      dropdown: null
    },
    {
      label: 'Focus Areas',
      href: '/focus-areas',
      dropdown: null
    },
    {
      label: 'Resources',
      href: '/resources',
      dropdown: [
        { label: 'Publications', href: '/resources/publications' },
        { label: 'News', href: '/resources/news' },
        { label: 'Blogs', href: '/resources/blog' },
        { label: 'Events and Activities', href: '/resources/events-and-activities' },
        // { label: 'Policy Briefs', href: '/resources/policy-briefs' },
        // { label: 'Annual Reports', href: '/resources/annual-reports' },
        // { label: 'Articles', href: '/resources/articles' },
        // { label: 'Newsletters', href: '/resources/newsletters' },
      ]
    },
    {
      label: 'Multimedia',
      href: '/multimedia',
      dropdown: [
        { label: 'Podcasts', href: '/multimedia/podcasts' },
        { label: 'Videos', href: '/multimedia/videos' },
        { label: 'Gallery', href: '/multimedia/gallery' },
      ]
    },
    {
      label: 'Get Involved',
      href: '/get-involved',
      dropdown: [
        { label: 'Careers & Internships', href: '/get-involved/career' },
        { label: 'Fellowships', href: '/get-involved/fellowships' },
        { label: 'Announcements', href: '/get-involved/announcements' },
        { label: 'Donate', href: '/get-involved/donate' },
        { label: 'Membership', href: '/get-involved/membership' },
      ]
    },
    {
      label: 'Contact Us',
      href: '/get-involved/contact',
      dropdown: null
    },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src="/CEPA-LOGO.webp" 
              alt="CEPA Logo" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => {
              if (item.dropdown) {
                return (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200">
                        {item.label}
                        <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64 bg-white/40 border border-white/50 backdrop-blur-sm">
                      {item.dropdown.map((dropdownItem) => (
                        <DropdownMenuItem key={dropdownItem.label} asChild>
                          <Link href={dropdownItem.href}>
                            {dropdownItem.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              } else {
                return (
                  <Button key={item.label} variant="ghost" asChild className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200">
                    <Link href={item.href}>
                      {item.label}
                    </Link>
                  </Button>
                );
              }
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveDropdown(activeDropdown === 'mobile' ? null : 'mobile')}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {activeDropdown === 'mobile' && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {menuItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200"
                    onClick={() => setActiveDropdown(null)}
                  >
                    {item.label}
                  </Link>
                  {item.dropdown && (
                    <div className="pl-6 space-y-1">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          href={dropdownItem.href}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
