import Link from 'next/link';
import { Shield, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SignupFooter() {
  return (
    <>
      {/* Features */}
      <div className="mt-8 grid grid-cols-3 gap-3">
        {[
          { icon: Shield, text: 'Secure' },
          { icon: Sparkles, text: 'Free Forever' },
          { icon: CheckCircle2, text: 'Easy Setup' },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-center gap-1.5 text-xs text-[#9b8d80] bg-white/60 backdrop-blur-sm rounded-xl py-2.5 px-3 border border-amber-100/40 font-medium">
            <item.icon className="w-3.5 h-3.5 text-amber-400" />
            <span>{item.text}</span>
          </div>
        ))}
      </div>

      {/* Terms */}
      <p className="text-center text-xs text-[#9b8d80] mt-6 font-medium leading-relaxed">
        By creating an account, you agree to our{' '}
        <Link href="/terms" className="text-[#6b5d50] hover:text-amber-600 underline underline-offset-2 transition-colors font-semibold">
          Terms
        </Link>
        {' '}and{' '}
        <Link href="/privacy" className="text-[#6b5d50] hover:text-amber-600 underline underline-offset-2 transition-colors font-semibold">
          Privacy Policy
        </Link>
      </p>
    </>
  );
}