import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { CurrencyType } from '@/redux/paymentReducer';
import { AppDispatch, RootState } from '@/redux/store';
import formatTrackerTime from '@/utils/formatTrackerTime';
import MaterialSymbolsMoneyBag from '~icons/material-symbols/money-bag';
import MaterialSymbolsMoneyBagOutline from '~icons/material-symbols/money-bag-outline';

import Tip from '../shared/Tip';

export default function CurrencyController() {
  const dispatch = useAppDispatch<AppDispatch>();
  const payment = useAppSelector((state: RootState) => state.payment);
  const timer = useAppSelector((state: RootState) => state.timer);

  const getCurrencyIco = (currencyType: CurrencyType) => {
    if (currencyType === CurrencyType.Ruble) {
      return '₽';
    } else if (CurrencyType.Dollar) {
      return '$';
    } else if (CurrencyType.Euro) {
      return '€';
    } else if (CurrencyType.Pound) {
      return '£';
    } else if (CurrencyType.Yen) {
      return '¥';
    } else {
      return 'unknown currency';
    }
  };

  return (
    <div className="flex flex-row items-center justify-between text-sm">
      {/* <div className="flex flex-row bg-surface gap-3">
        <button className="inline-flex items-center gap-1 bg-accent px-3 py-2 text-tracker-white rounded-md">
          <MaterialSymbolsMoneyBag /> Set hourly rate
        </button>
      </div> */}
      <div className="inline-flex items-center gap-1">
        <Tip
          keybind={[formatTrackerTime(timer.time.remaining)]}
          description="x"
          isDefaultTextSize={true}
        />
        <Tip
          keybind={[payment.hourlyRate, getCurrencyIco(payment.currency)]}
          description="per hour"
          isDefaultTextSize={true}
        />
      </div>
    </div>
  );
}
