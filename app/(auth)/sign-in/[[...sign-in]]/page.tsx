import { Loader2 } from 'lucide-react';
import { SignIn, ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Logo */}
      <div className="flex items-center justify-center lg:w-1/2 bg-gray-50">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={400}
          height={400}
          priority
          className="hidden lg:block max-w-md w-full"
        />
      </div>

      {/* Right side - Sign In Form */}
      <div className="w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          <div className="flex items-center justify-center lg:justify-start text-center lg:text-left">
            {/* Show logo beside the message on mobile */}
            <div className="lg:hidden mr-4">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={50}  // Smaller logo size on mobile
                height={50}
                className="mx-auto"
                priority
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Welcome back
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Please sign in to your account
              </p>
            </div>
          </div>
          <div className="mt-8">
            <ClerkLoaded>
              <SignIn path='/sign-in' routing="path" signUpUrl="/sign-up" />
            </ClerkLoaded>
            <ClerkLoading>
              <div className="flex justify-center items-center">
                <Loader2 className="w-16 h-16 animate-spin text-indigo-600" />
              </div>
            </ClerkLoading>
          </div>
        </div>
      </div>
    </div>
  );
}
