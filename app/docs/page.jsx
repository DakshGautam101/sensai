import React from 'react'
import { Mail, RefreshCw, AlertCircle, HelpCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const Docs = () => {
  return (
    <div className='max-w-4xl mx-auto px-4 py-8 mt-16 text-gray-100'>
      {/* Header */}
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold mb-4 text-white'>Sensai Documentation</h1>
        <p className='text-lg text-gray-300'>
          Your AI-powered React project assistant
        </p>
      </div>

      {/* Getting Started */}
      <section className='mb-12'>
        <h2 className='text-2xl font-semibold mb-4 text-white'>Getting Started</h2>
        <div className='bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700'>
          <p className='text-lg mb-4 text-gray-200'>
            Welcome to Sensai! This tool helps you create and manage your React projects with AI assistance.
            Here's how to get started:
          </p>
          <ol className='list-decimal list-inside space-y-2 text-gray-300'>
            <li>Open the main interface</li>
            <li>Describe your project requirements</li>
            <li>Let Sensai generate the code for you</li>
            <li>Review and modify the generated code as needed</li>
          </ol>
        </div>
      </section>

      {/* Code Download & Export */}
      <section className='mb-12'>
        <h2 className='text-2xl font-semibold mb-4 text-white'>Code Download & Export</h2>
        <div className='bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700'>
          <div className='space-y-6'>
            <div>
              <h3 className='text-xl font-semibold mb-3 text-white'>Exporting Your Project</h3>
              <p className='text-gray-300 mb-4'>
                You can easily export and download your project code in a few simple steps:
              </p>
              <ol className='list-decimal list-inside space-y-3 text-gray-300'>
                <li>Navigate to the preview tab of your project</li>
                <li>Click the "Open Sandbox" button in the top-right corner</li>
                <li>Wait for the sandbox environment to load</li>
                <li>Copy the unique URL displayed in the sandbox interface</li>
                <li>Sign in to your account to access the download option</li>
                <li>Click the download button to get your project files</li>
              </ol>
            </div>

            <div className='bg-gray-900 rounded-lg p-4 border border-gray-700'>
              <h4 className='font-semibold mb-2 text-white'>Preview Interface</h4>
              <div className='aspect-video bg-gray-800 rounded-lg flex items-center justify-center mb-3'>
                <Image src="/screenshot.png" alt="Preview Interface" width={1600} height={1650} />
              </div>
              <p className='text-sm text-gray-400'>
                The preview interface shows your project in action and provides easy access to export options.
              </p>
            </div>

            <div className='bg-gray-900 rounded-lg p-4 border border-gray-700'>
              <h4 className='font-semibold mb-2 text-white'>Important Notes</h4>
              <ul className='list-disc list-inside space-y-2 text-gray-300'>
                <li>Make sure to save your work before exporting</li>
                <li>The sandbox URL is unique to your project and can be shared</li>
                <li>Downloaded files include all dependencies and configuration</li>
                <li>You can export your project at any time during development</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Common Issues & Solutions */}
      <section className='mb-12'>
        <h2 className='text-2xl font-semibold mb-4 text-white'>Common Issues & Solutions</h2>
        <div className='space-y-4'>
          <div className='bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700'>
            <div className='flex items-start gap-3'>
              <RefreshCw className='w-6 h-6 text-blue-400 mt-1' />
              <div>
                <h3 className='font-semibold mb-2 text-white'>Code Not Generating Automatically</h3>
                <p className='text-gray-300'>
                  If the code doesn't generate automatically, try these steps:
                </p>
                <ul className='list-disc list-inside mt-2 text-gray-300'>
                  <li>Refresh the page</li>
                  <li>Clear your browser cache</li>
                  <li>Check your internet connection</li>
                  <li>Try a different browser</li>
                </ul>
              </div>
            </div>
          </div>

          <div className='bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700'>
            <div className='flex items-start gap-3'>
              <AlertCircle className='w-6 h-6 text-yellow-400 mt-1' />
              <div>
                <h3 className='font-semibold mb-2 text-white'>Error Messages</h3>
                <p className='text-gray-300'>
                  If you encounter any error messages:
                </p>
                <ul className='list-disc list-inside mt-2 text-gray-300'>
                  <li>Take a screenshot of the error</li>
                  <li>Note down the steps that led to the error</li>
                  <li>Contact support with these details</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className='mb-12'>
        <h2 className='text-2xl font-semibold mb-4 text-white'>Frequently Asked Questions</h2>
        <div className='space-y-4'>
          <div className='bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700'>
            <div className='flex items-start gap-3'>
              <HelpCircle className='w-6 h-6 text-purple-400 mt-1' />
              <div>
                <h3 className='font-semibold mb-2 text-white'>What is Sensai?</h3>
                <p className='text-gray-300'>
                  Sensai is an AI-powered tool that helps you create and manage React projects by generating code based on your requirements.
                </p>
              </div>
            </div>
          </div>

          <div className='bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700'>
            <div className='flex items-start gap-3'>
              <HelpCircle className='w-6 h-6 text-purple-400 mt-1' />
              <div>
                <h3 className='font-semibold mb-2 text-white'>Is my code safe?</h3>
                <p className='text-gray-300'>
                  Yes, all code generation happens locally in your browser. We don't store or share your code.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className='mb-12'>
        <h2 className='text-2xl font-semibold mb-4 text-white'>Need Help?</h2>
        <div className='bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700'>
          <div className='flex items-start gap-3'>
            <Mail className='w-6 h-6 text-green-400 mt-1' />
            <div>
              <h3 className='font-semibold mb-2 text-white'>Contact Us</h3>
              <p className='text-gray-300'>
                If you need any assistance or have questions, please reach out to us:
              </p>
              <ul className='mt-2 text-gray-300'>
                <li>Email: <Link href="mailto:Crushgaming990@gmail.com">Crushgaming990@gmail.com</Link></li>
                <li>GitHub: <Link href={'https://github.com/DakshGautam101'}>DakshGautam101</Link></li>
                <li>Linkedin: <Link href={'https://www.linkedin.com/in/daksh-gautam-03abb732b/'}>Daksh Gautam</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='text-center text-gray-400 text-sm'>
        <p>© 2024 Sensai. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Docs