import { useState, useEffect } from 'react';

const AGE_VERIFIED_KEY = 'age_verified';

export function useAgeVerification() {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem(AGE_VERIFIED_KEY);
    if (verified === 'true') {
      setIsVerified(true);
      setShowModal(false);
    } else {
      setIsVerified(false);
      setShowModal(true);
    }
  }, []);

  const verify = () => {
    localStorage.setItem(AGE_VERIFIED_KEY, 'true');
    setIsVerified(true);
    setShowModal(false);
  };

  const deny = () => {
    setIsVerified(false);
    setShowModal(false);
  };

  return {
    isVerified,
    showModal,
    verify,
    deny,
  };
}
