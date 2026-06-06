export const metadata = {
  title: 'Privacy Policy - PagePulse',
  description: 'How PagePulse collects, uses, and protects your data.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#3d3530] mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-8">
        Effective Date: January 1, 2024 | Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      </p>
      
      <div className="prose prose-gray max-w-none space-y-8">
        
        <section>
          <h2 className="text-xl font-semibold text-[#3d3530] mb-3">1. Introduction</h2>
          <p className="text-gray-600 leading-relaxed">
            PagePulse (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
            when you use our reading tracker application. By using PagePulse, you consent to the 
            data practices described in this policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#3d3530] mb-3">2. Information We Collect</h2>
          
          <h3 className="text-lg font-medium text-[#3d3530] mt-4 mb-2">2.1 Information You Provide</h3>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            <li><strong>Account Information:</strong> Email address and authentication credentials (managed securely by Supabase).</li>
            <li><strong>Profile Data:</strong> Username, display name, avatar (optional).</li>
            <li><strong>Reading Data:</strong> Books you track, reading progress, goals, timer sessions, achievements, and reviews.</li>
          </ul>

          <h3 className="text-lg font-medium text-[#3d3530] mt-4 mb-2">2.2 Information Collected Automatically</h3>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            <li><strong>Usage Data:</strong> Pages visited, features used, time spent on the app.</li>
            <li><strong>Device Information:</strong> Browser type, operating system, device type.</li>
            <li><strong>Cookies:</strong> Essential authentication cookies for session management. No tracking cookies.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#3d3530] mb-3">3. How We Use Your Information</h2>
          <p className="text-gray-600 mb-2">We use your data <strong>exclusively</strong> to:</p>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            <li>Provide, maintain, and improve the PagePulse service</li>
            <li>Personalize your reading experience and recommendations</li>
            <li>Send essential account-related communications (password reset, verification)</li>
            <li>Analyze usage patterns to improve features and user experience</li>
            <li>Detect, prevent, and address technical issues or abuse</li>
          </ul>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
            <p className="text-amber-800 text-sm font-medium">
              ⚠️ We <strong>DO NOT</strong> sell, rent, or share your personal data with third parties 
              for marketing purposes. Your reading data is yours alone.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#3d3530] mb-3">4. Data Storage & Security</h2>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>
              <strong>Authentication:</strong> Handled by <strong>Supabase</strong> (industry-standard encryption). 
              Passwords are hashed using bcrypt. We never see or store your plain-text password.
            </li>
            <li>
              <strong>Database:</strong> Your data is stored in Supabase&apos;s secure PostgreSQL database 
              with encryption at rest and in transit.
            </li>
            <li>
              <strong>API Security:</strong> Row Level Security (RLS) ensures you can only access your own data.
            </li>
            <li>
              <strong>Hosting:</strong> The application is hosted on Vercel/Netlify with HTTPS encryption.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#3d3530] mb-3">5. Third-Party Services</h2>
          <p className="text-gray-600 mb-2">
            PagePulse uses the following trusted third-party services:
          </p>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            <li><strong>Supabase:</strong> Authentication and database hosting. <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Supabase Privacy Policy</a></li>
            <li><strong>Vercel/Netlify:</strong> Application hosting and deployment.</li>
          </ul>
          <p className="text-gray-600 mt-2">
            These services have their own privacy policies, and we encourage you to review them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#3d3530] mb-3">6. Your Rights</h2>
          <p className="text-gray-600 mb-2">You have the right to:</p>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            <li><strong>Access</strong> your personal data</li>
            <li><strong>Correct</strong> inaccurate data</li>
            <li><strong>Delete</strong> your account and all associated data</li>
            <li><strong>Export</strong> your data in a portable format</li>
            <li><strong>Withdraw</strong> consent at any time</li>
          </ul>
          <p className="text-gray-600 mt-2">
            To exercise these rights, contact us at the email below. We&apos;ll respond within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#3d3530] mb-3">7. Data Retention</h2>
          <p className="text-gray-600">
            We retain your data as long as your account is active. When you delete your account, 
            all personally identifiable information is permanently deleted within 30 days. 
            Anonymized usage statistics may be retained indefinitely.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#3d3530] mb-3">8. Children&apos;s Privacy</h2>
          <p className="text-gray-600">
            PagePulse is not intended for children under 13. We do not knowingly collect 
            data from children under 13. If you believe a child has provided us with 
            personal data, please contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#3d3530] mb-3">9. Changes to This Policy</h2>
          <p className="text-gray-600">
            We may update this policy periodically. We&apos;ll notify you of significant changes 
            via email or through the app. Continued use after changes constitutes acceptance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#3d3530] mb-3">10. Contact Us</h2>
          <p className="text-gray-600">
            For privacy-related questions or data requests:<br />
            📧 <a href="mailto:privacy@pagepulse.app" className="text-amber-600 hover:underline">privacy@pagepulse.app</a><br />
            🐙 <a href="https://github.com/fitriadamayanti12/pagepulse" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">GitHub Repository</a>
          </p>
        </section>

        <hr className="my-8 border-gray-200" />

        <p className="text-xs text-gray-400 text-center">
          This privacy policy was last reviewed on {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
          We are committed to transparency and protecting your data.
        </p>
      </div>
    </div>
  );
}