import Link from 'next/link';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TopicNotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <MessageCircle className="w-20 h-20 text-[#9b8d80] mx-auto mb-4 opacity-40" />
        <p className="text-lg text-[#9b8d80] font-semibold mb-2">Topic not found</p>
        <Link href="/discussion">
          <Button variant="outline" className="mt-4 border-2 border-amber-100/40 rounded-2xl text-base font-bold text-[#6b5d50]">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Discussions
          </Button>
        </Link>
      </div>
    </div>
  );
}