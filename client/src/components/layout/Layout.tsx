import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AgeVerificationModal from './AgeVerificationModal';
import { useAgeVerification } from '@/hooks/useAgeVerification';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { showModal, verify, deny, isVerified } = useAgeVerification();

  if (isVerified === false && !showModal) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-white mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You must be 18 years or older to access this website.
          </p>
          <a 
            href="https://www.google.com" 
            className="text-primary hover:underline"
          >
            Leave this website
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AgeVerificationModal 
        open={showModal} 
        onVerify={verify} 
        onDeny={deny} 
      />
      <Navbar />
      <main className="flex-1 pt-16 lg:pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
