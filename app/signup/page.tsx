import SignupBackground from '@/components/auth/SignupBackground';
import SignupHeader from '@/components/auth/SignupHeader';
import SignupForm from '@/components/auth/SignupForm';
import SignupFooter from '@/components/auth/SignupFooter';

export const metadata = {
  title: 'Sign Up - PagePulse',
  description: 'Create your free PagePulse account and start tracking your reading journey.',
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#fefdfb] relative flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background with Floating Books */}
      <SignupBackground />

      <div className="w-full max-w-lg">
        {/* Header */}
        <SignupHeader />

        {/* Form */}
        <SignupForm />

        {/* Footer */}
        <SignupFooter />
      </div>
    </div>
  );
}