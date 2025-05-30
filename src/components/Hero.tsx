import React, { useState, useEffect } from 'react';
import { MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { format, isWithinInterval, parse } from 'date-fns';
import FoodTruck from './FoodTruck';

const SLIDESHOW_IMAGES = [
  {
    url: 'https://cnkalkntbjisvbpjtojk.supabase.co/storage/v1/object/public/media//oxtail-stew-feature-1200x1200-1.jpg',
    caption: 'Ox Tail'
  },
  {
    url: 'https://cnkalkntbjisvbpjtojk.supabase.co/storage/v1/object/public/media//Curry%20Chicken%20&%20Rice.jpg',
    caption: 'Curry Chicken and Rice'
  },
  {
    url: 'https://cnkalkntbjisvbpjtojk.supabase.co/storage/v1/object/public/media//fried-plantains-msn-1.jpg',
    caption: 'Plantains'
  },
   {
      url: '  https://cnkalkntbjisvbpjtojk.supabase.co/storage/v1/object/public/media//Jerk%20Chicken%20&%20Rice.jpg',
      caption: 'Jerk Chicken and Rice'
    }

];

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => 
          prev === SLIDESHOW_IMAGES.length - 1 ? 0 : prev + 1
        );
        setIsTransitioning(false);
      }, 500); // Half of the transition duration
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    checkIfOpen();
    // Check status every minute
    const statusInterval = setInterval(checkIfOpen, 60000);
    return () => clearInterval(statusInterval);
  }, []);

  async function checkIfOpen() {
    try {
      const today = new Date();
      const currentTime = format(today, 'HH:mm:ss');
      const currentDate = format(today, 'yyyy-MM-dd');

      // Get today's schedule
      const { data: schedules, error } = await supabase
        .from('schedules')
        .select(`
          *,
          location:locations(*)
        `)
        .eq('date', currentDate)
        .order('start_time', { ascending: true });

      if (error) throw error;

      // Check if current time falls within any scheduled time slots
      const isCurrentlyOpen = schedules?.some(schedule => {
        const start = parse(schedule.start_time, 'HH:mm:ss', new Date());
        const end = parse(schedule.end_time, 'HH:mm:ss', new Date());
        return isWithinInterval(parse(currentTime, 'HH:mm:ss', new Date()), { start, end });
      });

      setIsOpen(!!isCurrentlyOpen);
    } catch (error) {
      console.error('Error checking open status:', error);
    }
  }

  return (
    <div className="relative min-h-[100vh] flex items-center pt-12">
      {SLIDESHOW_IMAGES.map((image, index) => (
        <div
          key={image.url}
          className={`
            absolute inset-0 transition-opacity duration-1000
            ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}
            ${isTransitioning ? 'opacity-50' : ''}
          `}
          style={{
            backgroundImage: `url('${image.url}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.5)'
          }}
        />
      ))}
      
      {/* Slideshow Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-5 flex gap-2">
        {SLIDESHOW_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentImageIndex(index);
                setIsTransitioning(false);
              }, 500);
            }}
            className={`
              w-2 h-2 rounded-full transition-all
              ${index === currentImageIndex 
                ? 'bg-white w-6' 
                : 'bg-white/50 hover:bg-white/80'}
            `}
            aria-label={`Show slide ${index + 1}`}
          />
        ))}
      </div>
      <FoodTruck />
      
      <div className="container mx-auto px-4 z-10 mt-8">
        <div className="max-w-2xl">
          <img 
            src="https://cnkalkntbjisvbpjtojk.supabase.co/storage/v1/object/public/media//afro%20jerk%20logo@0%20(1).5x"
            alt="Afro Jerk Logo"
            className="w-48 max-w-xs h-auto mb-8 animate-fade-in"
          />
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Where Africa Meets Caribbean
          </h1>
          
          <p className="text-xl text-white/90 mb-8">
            Experience the perfect fusion of African and Caribbean flavors, 
            bringing you a unique culinary journey on wheels.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link
              to="/locate"
              className="flex items-center gap-2 bg-[#eb1924] text-white px-6 py-3 rounded-full hover:bg-[#eb1924]/90 transition-colors"
            >
              <MapPin className="w-5 h-5" />
              Find Us Now
            </Link>
            
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full">
              <Clock className="w-5 h-5" />
              <span className="font-medium">
                {isOpen ? 'Open Now' : 'Closed'}
              </span>
              <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-[#01a952]' : 'bg-[#eb1924]'}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
