import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface UseCMSDataOptions {
  locale?: string;
}

export function useCMSData<T>(
  collection: string,
  slug?: string,
  options?: UseCMSDataOptions
) {
  const { i18n } = useTranslation();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const locale = options?.locale || i18n.language;
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let url = `${apiUrl}/${collection}`;

        if (slug) {
          url += `?where[slug][equals]=${slug}`;
        }

        url += `${slug ? '&' : '?'}locale=${locale}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch ${collection}`);
        }

        const result = await response.json();

        // If fetching by slug, return the first doc, otherwise return all docs
        setData(slug ? result.docs[0] : result.docs);
      } catch (err) {
        setError(err as Error);
        console.error(`Error fetching ${collection}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collection, slug, locale, apiUrl]);

  return { data, loading, error };
}
