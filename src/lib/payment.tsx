// Free / paid tier with a MOCK payment (200 ₸).
// REAL PAYMENTS LATER: replace mockPay() with a call to your provider —
//   • Kaspi Pay (Kazakhstan): create invoice via Kaspi API on a backend,
//     verify the webhook server-side, then set paid.
//   • CloudPayments / Freedom Pay / Stripe Checkout: same pattern —
//     the payment MUST be verified on a server; localStorage is only
//     a client-side cache of an already verified purchase.
import { createContext, useContext, useState, ReactNode } from 'react';

export const PRICE = '200 ₸';
export const PRODUCT = { price: 200, currency: 'KZT', name: 'Полная расшифровка Матрицы судьбы' };

interface Pay { paid: boolean; open: boolean; openPay: () => void; closePay: () => void; mockPay: () => void }
const Ctx = createContext<Pay>(null as unknown as Pay);

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [paid, setPaid] = useState(() => localStorage.getItem('lumina.paid') === '1');
  const [open, setOpen] = useState(false);
  const mockPay = () => {
    // MOCK: instantly mark as paid. Real flow: redirect to provider,
    // wait for server-verified confirmation, then persist.
    localStorage.setItem('lumina.paid', '1');
    setPaid(true);
    setOpen(false);
  };
  return (
    <Ctx.Provider value={{ paid, open, openPay: () => setOpen(true), closePay: () => setOpen(false), mockPay }}>
      {children}
    </Ctx.Provider>
  );
}

export const usePayment = () => useContext(Ctx);
