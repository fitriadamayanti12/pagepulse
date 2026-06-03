'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Quote, BookHeart } from 'lucide-react';

const quotes = [
  "Every page you read is a step toward wisdom.",
  "A reader lives a thousand lives before he dies.",
  "Books are a uniquely portable magic.",
  "Reading is to the mind what exercise is to the body.",
  "Today a reader, tomorrow a leader.",
  "The more that you read, the more things you will know.",
  "Reading gives us someplace to go when we have to stay where we are.",
  "A book is a dream that you hold in your hand.",
  "There is no friend as loyal as a book.",
  "Reading is essential for those who seek to rise above the ordinary.",
  "One book, one pen, one child, and one teacher can change the world.",
  "The journey of a lifetime starts with the turning of a page.",
  "Books are the quietest and most constant of friends.",
  "A room without books is like a body without a soul.",
  "Once you learn to read, you will be forever free.",
  "I have always imagined that Paradise will be a kind of library.",
  "Reading is a basic tool in the living of a good life.",
  "A book is a gift you can open again and again.",
  "The world belongs to those who read.",
  "Reading is dreaming with open eyes.",
  "Books are mirrors: you only see in them what you already have inside you.",
  "Reading should not be presented as a chore, but as a gift.",
  "You can find magic wherever you look. All you need is a book.",
  "Keep reading. It's one of the most marvelous adventures.",
  "Reading is the sole means by which we slip into another's skin.",
  "A book is like a garden carried in the pocket.",
  "To learn to read is to light a fire.",
  "Books are the treasured wealth of the world.",
  "Reading is the gateway skill that makes all other learning possible.",
  "A good book is the best of friends, the same today and forever.",
  "Books are the carriers of civilization.",
  "Reading is the key that opens doors to many good things.",
  "A book is a device to ignite the imagination.",
  "The greatest gift is a passion for reading.",
  "Books are the training weights of the mind.",
  "Reading makes the world bigger and life longer.",
  "Books are the legacies that great geniuses leave to mankind.",
  "Reading is a means of thinking with another person's mind.",
  "A book is a magic portal to another world.",
  "The reading of books is the best way to become wise.",
  "A book is a friend that never turns its back on you.",
  "The world is a book, and those who do not travel read only one page.",
  "Books are the compass that guide us through life's journey.",
  "Every book is a new adventure waiting to be discovered.",
  "Reading is the foundation of all knowledge.",
  "A book is a window to the world.",
  "The more you read, the more you grow.",
  "Books are the fuel for imagination.",
  "Reading opens doors to endless possibilities.",
  "A good book can change your perspective forever.",
  "The library is a hospital for the mind.",
  "Reading is the ultimate form of self-care.",
  "Books are bridges to understanding.",
  "Every great mind started as a reader.",
  "Reading is the path to enlightenment.",
  "A book a day keeps ignorance away.",
  "The pen is mightier than the sword, but the book is mightiest of all.",
  "Reading transforms ordinary moments into extraordinary adventures.",
  "Books are the anchors that keep us grounded while letting our minds soar.",
  "A single book can plant a forest of ideas.",
  "Reading is the silent revolution of the soul.",
  "The pages of a book are wings for the mind.",
  "Reading is not just a pastime, it's a way of life.",
  "Some books leave us free and some books make us free.",
  "Books are the quietest yet most powerful weapons.",
  "Reading is a form of meditation for the mind.",
  "A book a day keeps the boredom away.",
  "Reading is the best way to relax and expand your mind.",
  "Books are the plane, train, and road to anywhere.",
  "No two persons ever read the same book.",
  "A great book should leave you slightly exhausted at the end.",
  "Reading brings us unknown friends.",
  "The pleasure of reading is doubled when shared.",
  "The reading habit is the best hobby you can have.",
  "Books are lighthouses erected in the great sea of time.",
  "Reading is to the mind what music is to the soul.",
  "Reading is an act of civilization.",
  "Books can be dangerous. The best ones should be labeled 'This could change your life.'",
  "Reading is an exercise in empathy.",
  "A book is a story for the mind, a song for the soul.",
  "Reading is like breathing in, writing is like breathing out.",
  "Reading is the ultimate superpower.",
  "Books make the world a better place, one page at a time.",
  "The library is the temple of learning.",
  "Reading is the seed of all knowledge.",
  "A book is a journey without leaving home.",
  "Reading builds bridges where walls once stood.",
  "Every book is a new beginning.",
  "Books are the whispers of the past to the future.",
  "Reading is the light that guides us through darkness.",
];

export default function MotivationalQuote() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [showBookIcon, setShowBookIcon] = useState(false);

  useEffect(() => {
    setCurrentIndex(Math.floor(Math.random() * quotes.length));

    const interval = setInterval(() => {
      setIsChanging(true);
      setShowBookIcon(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => {
          let next = Math.floor(Math.random() * quotes.length);
          while (next === prev && quotes.length > 1) {
            next = Math.floor(Math.random() * quotes.length);
          }
          return next;
        });
        setIsChanging(false);
        setTimeout(() => setShowBookIcon(true), 300);
      }, 600);
    }, 60000);

    // Show book icon after initial load
    setTimeout(() => setShowBookIcon(true), 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center py-5">
      <div className="relative inline-block">
        {/* Outer glow */}
        <div className={`absolute -inset-4 bg-gradient-to-r from-amber-200/20 via-rose-200/20 to-violet-200/20 rounded-3xl blur-2xl transition-all duration-700 ${
          isChanging ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
        }`} />
        
        {/* Main card */}
        <div className={`relative bg-white/60 backdrop-blur-2xl rounded-3xl border-2 border-amber-100/40 shadow-xl px-8 py-5 transition-all duration-600 ${
          isChanging ? 'opacity-0 scale-95 -translate-y-2' : 'opacity-100 scale-100 translate-y-0'
        }`}>
          {/* Quote icon */}
          <div className="absolute -top-3 left-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl w-8 h-8 flex items-center justify-center shadow-lg shadow-amber-200/30">
            <Quote className="w-4 h-4 text-white" />
          </div>
          
          {/* Book icon - appears with animation */}
          <div className={`absolute -bottom-2 right-6 bg-white rounded-xl w-8 h-8 flex items-center justify-center shadow-lg border-2 border-amber-100/40 transition-all duration-500 ${
            showBookIcon ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-180'
          }`}>
            <BookHeart className="w-4 h-4 text-rose-400" />
          </div>

          {/* Sparkles */}
          <Sparkles className="absolute -top-2 -right-1 w-4 h-4 text-amber-400 animate-twinkle" />
          <Sparkles className="absolute -bottom-1 -left-1 w-3 h-3 text-rose-400 animate-twinkle-delayed" />
          
          {/* Quote text */}
          <div className="flex items-center gap-3">
            <p className="text-[#6b5d50] text-lg sm:text-xl font-semibold text-center leading-relaxed italic max-w-lg">
              "{quotes[currentIndex]}"
            </p>
          </div>
        </div>
      </div>
      
      {/* Counter with animation */}
      <div className={`mt-3 transition-all duration-500 ${isChanging ? 'opacity-0' : 'opacity-100'}`}>
        <p className="text-xs text-[#9b8d80] font-medium inline-flex items-center gap-1.5 bg-white/30 backdrop-blur-sm rounded-full px-3 py-1 border border-amber-100/30">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Quote {currentIndex + 1} of {quotes.length}
        </p>
      </div>
    </div>
  );
}