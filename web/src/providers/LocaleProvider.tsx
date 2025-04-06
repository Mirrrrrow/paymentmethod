import { debugData } from '@/lib';
import { useNuiEvent } from '@/lib/hooks';
import { Context, createContext, useContext, useState } from 'react';

debugData([
  {
    action: 'setLocale',
    data: {
      language: 'English',
      ui: {
        title: 'Payment Method',
        description: 'How would you like to pay ${price}?',
        $: '$',
        methods: {
          cash: 'Cash',
          bank: 'Bank'
        }
      },
    },
  },
]);

interface Locale {
  language: string;
  ui: {
    title: string;
    description: string;
    $: string;
    methods: {
      cash: string;
      bank: string;
    }
  };
}

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locales: Locale) => void;
}

const LocaleCtx = createContext<LocaleContextValue | null>(null);

const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>({
    language: '',
    ui: {
      title: '',
      description: '',
      $: '',
      methods: {
        cash: '',
        bank: '',
      }
    },
  });

  useNuiEvent('setLocale', async (data: Locale) => setLocale(data));

  return <LocaleCtx.Provider value={{ locale, setLocale }}>{children}</LocaleCtx.Provider>;
};

export default LocaleProvider;

export const useLocales = () => useContext<LocaleContextValue>(LocaleCtx as Context<LocaleContextValue>);