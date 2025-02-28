
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className='space-y-2'>
            <img src="/images/logo-shop.jpeg" className='rounded-sm max-w-[200px]' alt="" />
            {/* <h3 className="text-white text-lg font-bold mb-4">ShoppyX</h3> */}
            <p className="text-sm">Your one-stop destination for trendy fashion and accessories.</p>
          </div>
          
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
              <li><a href="#" className="hover:text-white transition">FAQs</a></li>
              <li><a href="#" className="hover:text-white transition">Shipping</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Track Order</a></li>
              <li><a href="#" className="hover:text-white transition">Returns</a></li>
              <li><a href="#" className="hover:text-white transition">Size Guide</a></li>
              <li><a href="#" className="hover:text-white transition">Gift Cards</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-white transition">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-white transition">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-white transition">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>&copy; 2025 ShoppyX. All rights reserved. Developed by Debjit Adhikari</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;