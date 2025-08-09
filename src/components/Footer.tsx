import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const MENU_LINKS = [
  { label: 'Menu', path: '/menu' },
  { label: 'Order Now', path: '/order' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

const SOCIAL_LINKS = [
  { icon: Instagram, url: 'https://www.instagram.com/afrojerkfood/' },
  // { icon: Facebook, url: 'https://facebook.com/afrojerk' },
  // { icon: Twitter, url: 'https://twitter.com/afrojerk' },
];

const CONTACT_INFO = {
  phone: '+1 (803) 762-0445',
  email: 'afrojerkfood@gmail.com',
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white/80">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <img 
              src="https://ljrrjebhknseythijqku.supabase.co/storage/v1/object/public/media/AfroJerk%20Supabase%20Transfer%20Pics/afro%20jerk%20logo@0.5x.png"
              alt="Afro Jerk Logo"
              className="h-36 w-auto"
            />
            <p className="text-sm mt-4">
              Bringing the vibrant flavors of Africa and the Caribbean to the Carolinas.
            </p>
          </div>

          {/* Menu Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Menu</h3>
            <ul className="space-y-2">
              {MENU_LINKS.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
      
              <li>
                <a 
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.url}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} Afro Jerk Food Truck. All rights reserved.
          </p>
          <div className="text-sm">
            Designed by{' '}
            <a 
              href="https://www.sitesonpolaris.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-[#eb1924] transition-colors"
            >
              Sites on Polaris
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
