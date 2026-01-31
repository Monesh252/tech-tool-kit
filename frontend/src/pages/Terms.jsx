import React from 'react';

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Acceptance of Terms</h2>
            <p className="text-gray-700">
              By accessing and using our services, you accept and agree to be bound by these Terms...
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">User Accounts</h2>
            <p className="text-gray-700">
              You are responsible for maintaining the confidentiality of your account credentials...
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">Prohibited Activities</h2>
            <p className="text-gray-700">
              You agree not to engage in any of the following prohibited activities...
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;