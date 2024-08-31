import React, { useState, useEffect } from "react";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { AnimatePresence, motion } from "framer-motion";
import { fetchNui } from "../utils/fetchNui";
import { useKeyPress } from "../hooks/useKeyPress";
import "./App.scss";

interface Configuration {
  title: string;
  description: string;
  moneyLabel: string;
  bankLabel: string;
}

const defaultConfiguration: Configuration = {
  title: "Payment Method",
  description: "How would you like to pay {price}?",
  moneyLabel: "Cash",
  bankLabel: "Bank Account",
};

const App: React.FC = () => {
  const [configuration, setConfiguration] =
    useState<Configuration>(defaultConfiguration);
  const [price, setPrice] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [splittedDescription, setSplittedDescription] = useState<string[]>(
    configuration.description.split("{price}")
  );

  useEffect(() => {
    setSplittedDescription(configuration.description.split("{price}"));
  }, [configuration.description]);

  useNuiEvent<Configuration>("setConfiguration", setConfiguration);
  useNuiEvent<number>("setPaymentPrice", (data) => {
    setPrice(data);
    setIsVisible(true);
  });

  const close = () => {
    fetchNui("cancelPayment");
    setIsVisible(false);
  };

  const handlePaymentSelection = (method: "money" | "bank") => {
    fetchNui("selectPaymentMethod", method);
    setIsVisible(false);
  };

  const escapePressed = useKeyPress("escape");
  useEffect(() => {
    if (escapePressed) {
      close();
    }
  }, [escapePressed]);

  useEffect(() => {
    fetchNui("init", {});
  }, []);

  return (
    <div className="payment-method">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.2, ease: [0, 0, 0.2, 1] },
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              transition: { duration: 0.1, ease: [0.4, 0, 1, 1] },
            }}
          >
            <div className="container">
              <div className="banner">{configuration.title}</div>
              <div className="description">
                {splittedDescription[0]}
                <span>{price.toLocaleString()}$</span>
                {splittedDescription[1]}
              </div>
              <div className="options">
                <div
                  className="option"
                  onClick={() => handlePaymentSelection("money")}
                >
                  <img src="./img/money.png" alt="Cash" />
                  <div className="label">{configuration.moneyLabel}</div>
                </div>
                <div
                  className="option"
                  onClick={() => handlePaymentSelection("bank")}
                >
                  <img src="./img/bank.png" alt="Bank Account" />
                  <div className="label">{configuration.bankLabel}</div>
                </div>
              </div>
              <div className="exit" onClick={close}>
                X
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
