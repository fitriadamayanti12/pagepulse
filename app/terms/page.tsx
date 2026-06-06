export const metadata = {
  title: 'Terms of Service - PagePulse',
  description: 'Terms and conditions for using PagePulse.',
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#3d3530] mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-400 mb-8">
        Effective Date: January 1, 2024 | Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      </p>
      
      <div className="prose prose-gray max-w-none space-y-8">
        
        <section>
          <h2 className="text-xl font-semibold text-[#3d3530] mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-600 leading-relaxed">
            By accessing or using PagePulse (&ldquo;the Service&rdquo;), you agree to be bound by these 
            Terms of Service (&ldquo;Terms&rdquo;). If you do not agree, do not use the Service. 
            We reserve the right to update these Terms at any time. Continued use after 
            changes constitutes acceptance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#3d3530] mb-3">2. Description of Service</h2>
          <p className="text-gray-600">
            PagePulse is a personal reading tracker and productivity tool that allows users to:
          </p>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            <li>Track reading progress and set goals</li>
            <li>Use a reading timer with session history</li>
            <li>Earn achievements and review books</li>
            <li>Participate in community discussions</li>
          </ul>
          <p className="text-gray-600 mt-2">
            The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#3d3530] mb-3">3. User Accounts</h2>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>You must provide a valid email address to create an account.</li>
            <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
            <li>You are responsible for all activities that occur under your account.</li>
            <li>You must notify us immediately of any unauthorized use of your account.</li>
            <li>You must be at least 13 years old to use the Service.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#3d3530] mb-3">4. Acceptable Use Policy</h2>
          <p className="text-gray-600 mb-2">You agree <strong>NOT</strong> to:</p>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            <li>Use the Service for any illegal purpose or in violation of any laws</li>
            <li>Harass, abuse, or harm other users</li>
            <li>Upload malicious code, viruses, or any harmful content</li>
            <li>Attempt to gain unauthorized access to other users&apos; accounts or data</li>
            <li>Use bots, scripts, or automated methods to access the Service</li>
            <li>Impersonate others or provide false information</li>
            <li>Violate the intellectual property rights of others</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#3d3530] mb-3">5. Intellectual Property</h2>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li><strong>Your Content:</strong> You retain all rights to the data you create (reading lists, reviews, goals).</li>
            <li><strong>Our Content:</strong> The PagePulse name, logo, design, and code are our intellectual property.</li>
            <li><strong>License:</strong> By using the Service, you grant us a limited license to store and display your content solely for providing the Service to you.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#3d3530] mb-3">6. Data & Privacy</h2>
          <p className="text-gray-600">
            Your use of the Service is also governed by our{' '}
            <a href="/privacy" className="text-amber-600 hover:underline">Privacy Policy</a>. 
            We take data protection seriously and implement reasonable security measures.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#3d3530] mb-3">7. Limitation of Liability</h2>
          <p className="text-gray-600">
            To the fullest extent permitted by law, PagePulse and its creators shall not be 
            liable for any indirect, incidental, special, consequential, or punitive damages 
            arising from your use of the Service. Our total liability is limited to the amount 
            you paid us (if any) in the past 12 months.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <p className="text-blue-800 text-sm">
              ℹ️ PagePulse is a free, open-source project. We strive to provide a reliable 
              service but cannot guarantee 100% uptime or error-free operation.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#3d3530] mb-3">8. Account Termination</h2>
          <p className="text-gray-600">
            We reserve the right to suspend or terminate accounts that violate these Terms. 
            You may delete your account at any time through the app settings or by 
            contacting us. Upon deletion, your data will be removed per our Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#3d3530] mb-3">9. Open Source</h2>
          <p className="text-gray-600">
            PagePulse is an open-source project. You can view, fork, and contribute to the 
            source code on{' '}
            <a href="https://github.com/fitriadamayanti12/pagepulse" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">
              GitHub
            </a>. 
            The code is available under the MIT License.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#3d3530] mb-3">10. Governing Law</h2>
          <p className="text-gray-600">
            These Terms shall be governed by the laws of Indonesia. Any disputes shall 
            be resolved through good-faith negotiation first, then through the appropriate 
            legal channels if necessary.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#3d3530] mb-3">11. Contact</h2>
          <p className="text-gray-600">
            For questions about these Terms:<br />
            📧 <a href="mailto:terms@pagepulse.app" className="text-amber-600 hover:underline">terms@pagepulse.app</a><br />
            🐙 <a href="https://github.com/fitriadamayanti12/pagepulse/issues" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">Open an Issue on GitHub</a>
          </p>
        </section>

        <hr className="my-8 border-gray-200" />

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500 text-center">
            By using PagePulse, you acknowledge that you have read, understood, and agree 
            to these Terms of Service and our Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}