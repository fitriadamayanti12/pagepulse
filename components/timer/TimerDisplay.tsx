'use client';

import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

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
  "Reading transforms ordinary moments into extraordinary adventures.",
  "Books are the anchors that keep us grounded while letting our minds soar.",
  "A single book can plant a forest of ideas.",
  "Reading is the silent revolution of the soul.",
  "The pages of a book are wings for the mind.",
  "Reading is not just a pastime, it's a way of life.",
  "Some books leave us free and some books make us free.",
  "Books are the quietest yet most powerful weapons.",
  "Reading is a form of meditation for the mind.",
  "The pen is mightier than the sword, but the book is mightiest of all.",
  "A book a day keeps the boredom away.",
  "Reading is the best way to relax and expand your mind.",
  "Books are the plane, train, and road to anywhere.",
  "No two persons ever read the same book.",
  "A great book should leave you slightly exhausted at the end.",
  "Reading brings us unknown friends.",
  "The pleasure of reading is doubled when shared.",
  "Books are not made for furniture, but nothing furnishes a house so beautifully.",
  "The reading habit is the best hobby you can have.",
  "Books are lighthouses erected in the great sea of time.",
  "Reading is to the mind what music is to the soul.",
  "A book is the only place to examine a fragile thought without breaking it.",
  "Reading is an act of civilization.",
  "Books can be dangerous. The best ones should be labeled 'This could change your life.'",
  "The art of reading is adopting the pace the author has set.",
  "Books are the bees carrying pollen from one mind to another.",
  "Reading is an exercise in empathy.",
  "A book is a story for the mind, a song for the soul.",
  "Reading is like breathing in, writing is like breathing out.",
  "The best books tell you what you know already.",
  "Reading is the best way to become wise.",
  "Books are the quietest friends and the most accessible.",
  "A single book can change your entire perspective.",
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

interface TimerDisplayProps {
  seconds: number;
  isRunning: boolean;
  formatTime: (s: number) => string;
  getProgressPercent: () => number;
  getMotivationalText: () => string;
}

export default function TimerDisplay({ seconds, isRunning, formatTime, getProgressPercent, getMotivationalText }: TimerDisplayProps) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    setQuoteIndex(Math.floor(Math.random() * quotes.length));
    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setQuoteIndex((prev) => {
          let next = Math.floor(Math.random() * quotes.length);
          while (next === prev && quotes.length > 1) next = Math.floor(Math.random() * quotes.length);
          return next;
        });
        setIsChanging(false);
      }, 500);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-8 w-full">
      {/* Timer Circle */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
        <div className={`absolute -inset-8 rounded-full blur-3xl opacity-20 transition-all duration-700 ${
          isRunning ? 'bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 animate-pulse' : 'bg-gradient-to-r from-amber-200 via-orange-200 to-amber-200'
        }`} />
        
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="5" className="text-amber-100/50" />
          <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round"
            className={`transition-all duration-1000 ease-out ${isRunning ? 'text-amber-500' : 'text-amber-300'}`}
            strokeDasharray={2 * Math.PI * 54}
            strokeDashoffset={2 * Math.PI * 54 * (1 - getProgressPercent() / 100)}
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-6xl sm:text-7xl lg:text-8xl font-black text-[#3d3530] tracking-tighter tabular-nums leading-none">
            {formatTime(seconds)}
          </span>
          <span className="text-base sm:text-lg text-[#9b8d80] font-bold mt-3 px-6 text-center leading-snug">
            {getMotivationalText()}
          </span>
        </div>
      </div>

      {/* Motivational Quote - LEBAR & FONT BESAR */}
      <div className={`w-full max-w-xl px-6 py-5 bg-white/50 backdrop-blur-xl rounded-2xl border-2 border-amber-100/40 shadow-lg transition-all duration-500 mx-auto ${
        isChanging ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}>
        <div className="flex items-start sm:items-center gap-4">
          <Sparkles className="w-5 h-5 text-amber-400 animate-twinkle flex-shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-[#6b5d50] text-lg sm:text-xl font-semibold text-center leading-relaxed flex-1">
            "{quotes[quoteIndex]}"
          </p>
          <Sparkles className="w-5 h-5 text-amber-400 animate-twinkle-delayed flex-shrink-0 mt-0.5 sm:mt-0" />
        </div>
      </div>
    </div>
  );
}