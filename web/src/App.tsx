import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Bank from './assets/images/bank.png';
import Money from './assets/images/money.png';
import styles from './App.module.scss';
import { useNuiEvent } from './lib/hooks';
import { debugData, fetchNui } from './lib';
import { useLocales } from './providers/LocaleProvider';
import { useKeyDown } from './lib/keys';

debugData(
  [
    {
      action: 'paymentMethod:setPrice',
      data: 1000
    }
  ],
  1000
);

const App: React.FC = () => {
  const { locale } = useLocales();
  const [price, setPrice] = useState<number | null>(null);

  const close = () => {
    fetchNui('paymentMethod:close');
  };

  const selectPaymentMethod = (method: 'money' | 'bank') => {
    fetchNui('paymentMethod:select', method);
  };

  useKeyDown('Escape', () => {
    close();
  });

  useEffect(() => {
    fetchNui('init');
  }, []);

  useNuiEvent<number>('paymentMethod:setPrice', setPrice);
  return (
    <div className={styles.paymentMethod}>
      <AnimatePresence>
        {price != null && (
          <motion.div
            className={styles.container}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.2, ease: [0, 0, 0.2, 1] }
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              transition: { duration: 0.1, ease: [0.4, 0, 1, 1] }
            }}
          >
            <div className={styles.banner}>{locale.ui.title}</div>
            <div className={styles.description}>
              {locale.ui.description.split('${price}')[0]}
              <span>
                {locale.ui.$}
                {price}
              </span>
              {locale.ui.description.split('${price}')[1]}
            </div>
            <div className={styles.options}>
              <div
                className={styles.option}
                onClick={() => selectPaymentMethod('money')}
              >
                <img src={Money} />
                <div className={styles.label}>{locale.ui.methods.cash}</div>
              </div>
              <div
                className={styles.option}
                onClick={() => selectPaymentMethod('bank')}
              >
                <img src={Bank} />
                <div className={styles.label}>{locale.ui.methods.bank}</div>
              </div>
            </div>
            <div className={styles.exit} onClick={close}>
              X
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default App;
