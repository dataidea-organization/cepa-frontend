'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cohortService, Cohort } from '@/lib/cohort-service';
import { FocusAreaService, FocusAreaListItem } from '@/lib/focus-area-service';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileItems, setExpandedMobileItems] = useState<Set<string>>(new Set());
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [focusAreas, setFocusAreas] = useState<FocusAreaListItem[]>([]);

  useEffect(() => {
    async function fetchCohorts() {
      try {
        const data = await cohortService.getActiveCohorts();
        setCohorts(data);
      } catch (error) {
        console.error("Error fetching cohorts:", error);
      }
    }

    async function fetchFocusAreas() {
      try {
        const data = await FocusAreaService.getActiveFocusAreas();
        setFocusAreas(data);
      } catch (error) {
        console.error("Error fetching focus areas:", error);
      }
    }

    fetchCohorts();
    fetchFocusAreas();
  }, []);

  const menuItems = [
    {
      label: 'About Us',
      href: '/about',
      dropdown: [
        { label: 'Who We Are', href: '/about#who-we-are' },
        { label: 'Our Story', href: '/about#story' },
        { label: 'What Sets CEPA Apart', href: '/about#what-sets-cepa-apart' },
        { label: 'Our Partners', href: '/about#our-partners' },
        { label: 'Our Team', href: '/about#our-team' },
      ]
    },
    {
      label: 'Resources',
      href: '/resources',
      dropdown: [
        { label: 'Publications', href: '/resources/publications' },
        { label: 'News', href: '/resources/news' },
        { label: 'Blogs', href: '/resources/blog' },
        { label: 'Events and Activities', href: '/resources/events-and-activities' },
        { label: 'Chat Assistant', href: '/resources/chat' },
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
        { label: 'Citizens Voice', href: '/citizens-voice' },
        { label: 'Careers & Internships', href: '/get-involved/career' },
        { label: 'Announcements', href: '/get-involved/announcements' },
        { label: 'Contact Us', href: '/get-involved/contact' },
        { label: 'Membership', href: '/get-involved/membership' },
      ]
    },
  ];

  // Dynamic Focus Areas menu item
  const focusAreasMenuItem = {
    label: 'Focus Areas',
    href: '/focus-areas',
    dropdown: focusAreas.length > 0 ? [
      ...focusAreas.map(area => ({
        label: area.title,
        href: `/focus-areas/${area.slug}`
      })),
      { label: 'View All', href: '/focus-areas' }
    ] : [
      { label: 'View All', href: '/focus-areas' }
    ]
  };

  // Dynamic Fellowships menu item with cohorts
  const fellowshipsMenuItem = {
    label: 'Fellowships',
    href: '/get-involved/fellowships',
    dropdown: cohorts.length > 0 ? [
      ...cohorts.map(cohort => ({
        label: cohort.name,
        href: `/get-involved/fellowships/cohorts/${cohort.slug}`
      })),
      { label: 'Apply Now', href: '/get-involved/career' }
    ] : [
      { label: 'Apply Now', href: '/get-involved/career' }
    ]
  };

  const allMenuItems = [...menuItems.slice(0, 1), focusAreasMenuItem, ...menuItems.slice(1), fellowshipsMenuItem];

  const toggleMobileDropdown = (itemLabel: string) => {
    const newExpanded = new Set(expandedMobileItems);
    if (newExpanded.has(itemLabel)) {
      newExpanded.delete(itemLabel);
    } else {
      newExpanded.add(itemLabel);
    }
    setExpandedMobileItems(newExpanded);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <img
              src="/CEPA-logo.png"
              alt="CEPA Logo"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
            {allMenuItems.map((item) => {
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

            {/* Parliament Watch Link */}
            <Button variant="ghost" asChild className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200">
              <a href="https://parliamentwatch.ug" target="_blank" rel="noopener noreferrer">
                Parliament Watch
              </a>
            </Button>

            {/* Support Us Button */}
            <Button asChild className="bg-green-800 hover:bg-green-900 text-white font-medium py-2 px-4 rounded-md transition-all duration-200">
              <Link href="/get-involved/donate">
                Support Us
              </Link>
            </Button>
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
              {allMenuItems.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      className="flex-1 block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200"
                      onClick={() => !item.dropdown && setActiveDropdown(null)}
                    >
                      {item.label}
                    </Link>
                    {item.dropdown && (
                      <button
                        onClick={() => toggleMobileDropdown(item.label)}
                        className="px-3 py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
                        aria-expanded={expandedMobileItems.has(item.label)}
                        aria-label={`Toggle ${item.label} menu`}
                      >
                        <svg
                          className={`h-5 w-5 transition-transform duration-200 ${
                            expandedMobileItems.has(item.label) ? 'transform rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {item.dropdown && expandedMobileItems.has(item.label) && (
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

              {/* Mobile Parliament Watch Link */}
              <a
                href="https://parliamentwatch.ug"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200"
                onClick={() => setActiveDropdown(null)}
              >
                Parliament Watch
              </a>

              {/* Mobile Support Us Button */}
              <div className="px-3 py-2">
                <Button asChild className="w-full bg-green-800 hover:bg-green-900 text-white font-medium py-2 px-4 rounded-md transition-all duration-200">
                  <Link href="/get-involved/donate" onClick={() => setActiveDropdown(null)}>
                    Support Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
