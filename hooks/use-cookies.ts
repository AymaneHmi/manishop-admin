import { useState, useEffect } from 'react';

const useCookie = (cookieName: string): string | undefined => {
  const [cookieValue, setCookieValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    const cookie = document.cookie.split('; ').find(row => row.startsWith(`${cookieName}=`));

    if (cookie) {
      const [, value] = cookie.split('=');
      setCookieValue(value);
    } else {
      setCookieValue(undefined);
    }
  }, [cookieName]);

  return cookieValue;
};

export default useCookie;