import React from 'react';
import { Link } from 'react-router-dom';
import {
  LinkIcon,
  BarChart3,
  QrCode,
  ChevronRight,
  Globe,
  LineChart
} from 'lucide-react';
import Navbar from './Navbar';
import FeatureCard from './FeatureCard ';
import FeatureListItem from './FeatureListItem ';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen ">
        <section className="pt-16 sm:pt-20 lg:pt-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 mt-16 sm:mt-20">
                More than just shorter links
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
                SmartUrl helps you create shorter, memorable links and track their performance with comprehensive analytics
              </p>
              <Link
                to="/signup"
                className="bg-[#5052ce] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-[#6a6bd5] transition-colors inline-flex items-center group"
              >
                Get Started               
              </Link>
            </div>
          </div>
        </section>
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <FeatureCard
                icon={<LinkIcon className="h-5 sm:h-6 w-5 sm:w-6 text-blue-600" />}
                title="Link Shortening"
                description="Transform long, unwieldy links into clean, memorable URLs that are easy to share and track."
              />
              <FeatureCard
                icon={<BarChart3 className="h-5 sm:h-6 w-5 sm:w-6 text-blue-600" />}
                title="Click Analytics"
                description="Track clicks, locations, and referring sources in real-time with detailed analytics."
              />
              <FeatureCard
                icon={<QrCode className="h-5 sm:h-6 w-5 sm:w-6 text-blue-600" />}
                title="QR Codes"
                description="Generate QR codes for your shortened links instantly for seamless offline-to-online experiences."
              />
            </div>
          </div>
        </section>
        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Powerful Analytics at Your Fingertips
                </h2>
                <ul className="space-y-4">
                  <FeatureListItem
                    icon={<Globe className="h-4 sm:h-5 w-4 sm:w-5 text-blue-600" />}
                    title="Geographic Data"
                    description="See where your clicks are coming from around the world"
                  />
                  <FeatureListItem
                    icon={<LineChart className="h-4 sm:h-5 w-4 sm:w-5 text-blue-600" />}
                    title="Click Tracking"
                    description="Monitor click patterns and engagement over time"
                  />
                  <FeatureListItem
                    icon={<BarChart3 className="h-4 sm:h-5 w-4 sm:w-5 text-blue-600" />}
                    title="Performance Insights"
                    description="Get detailed reports on link performance and user behavior"
                  />
                </ul>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg">
                  <div className="p-3 sm:p-4">
                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4 mb-3 sm:mb-4"></div>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className="h-16 sm:h-20 bg-blue-100 rounded"></div>
                      <div className="h-16 sm:h-20 bg-blue-100 rounded"></div>
                    </div>
                    <div className="h-24 sm:h-32 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              Ready to get started?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
              Join thousands of users who trust SmartUrl for their link management needs
            </p>
            <Link
              to="/signup"
              className="bg-[#5052ce] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-[#6a6bd5] transition-colors inline-flex items-center group"
            >
              Create Free Account
              
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;