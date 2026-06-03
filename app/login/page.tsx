import LoginBackground from '@/components/auth/LoginBackground';
import LoginHeader from '@/components/auth/LoginHeader';
import LoginForm from '@/components/auth/LoginForm';
import LoginFooter from '@/components/auth/LoginFooter';

export const metadata = {
  title: 'Sign In - PagePulse',
  description: 'Sign in to your PagePulse account and continue your reading journey.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#fffbf5] relative flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background with Floating Books */}
      <LoginBackground />

      <div className="w-full max-w-lg">
        {/* Header */}
        <LoginHeader />

        {/* Form */}
        <LoginForm />

        {/* Footer */}
        <LoginFooter />
      </div>
    </div>
  );
}