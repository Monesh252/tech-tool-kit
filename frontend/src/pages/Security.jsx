import React from 'react';

const Security = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Security</h1>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <p className="text-blue-700">
            We take the security of your data very seriously. Here's how we protect you...
          </p>
        </div>
        
        <div className="prose max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Our Security Practices</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>End-to-end encryption for sensitive data</li>
              <li>Regular security audits and penetration testing</li>
              <li>Compliance with industry security standards</li>
              <li>24/7 monitoring and incident response</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">Reporting Security Issues</h2>
            <p className="text-gray-700">
              If you discover a security vulnerability, please report it to us immediately at...
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Security;