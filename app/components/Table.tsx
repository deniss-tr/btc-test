import { useState, useEffect } from 'react';
import CurrencyUtil from '../utils/currencyUtil';
import Notification from './Notification';
import Loader from './Loader';

interface TableProps {
  title: string;
  balances: Balance[];
  error: string | null;
  loading: boolean;
}

interface Balance {
  amount: string;
  currencyId: string;
}

export default function Table({ title, balances = [], error, loading }: TableProps) {
  const [columns, setColumns] = useState<number>(3);
  const [filter, setFilter] = useState<string>('');
  const [stateBalances, setBalances] = useState<Balance[]>([]);
  const [removedItems, setRemovedItems] = useState<string[]>([]);;
  const [balancesChunks, setBalancesChunks] = useState<Balance[][]>([]);

  useEffect(() => {
    if (error) return;
    setBalances(balances);
  }, [balances]);

  useEffect(() => {
    if (error) return;

    const filteredCurrencies = stateBalances.filter((balance) => {
        if(removedItems.includes(balance.currencyId)) {
          return false;
        }
        
        const currency = CurrencyUtil.mapCurrencyIdToName(balance.currencyId);
        return currency.toLowerCase().includes(filter.toLowerCase());
      }
    );

    const resultArray = [];
    for(let i = 0; i < filteredCurrencies.length; i += columns) {
      const chunk = filteredCurrencies.slice(i, i + columns);
      resultArray.push(chunk)
    }

    if (resultArray.length) {
      const lastChunkIndex = resultArray.length - 1;
      const lastChunkCount = resultArray[lastChunkIndex].length;
      if (lastChunkCount !== columns) {
        for(let i = 0; i < (columns - lastChunkCount); i++) {
          resultArray[lastChunkIndex].push({} as Balance);
        }
      }
    }
  
    setBalancesChunks(resultArray);
  }, [columns, stateBalances, filter, removedItems]);

  const handleAddColumn = () => {
    setColumns((prev) => (prev < stateBalances.length ? prev + 1 : prev));
  };

  const handleRemoveColumn = () => {
    setColumns((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleRemoveItem = (currencyId: string) => {
    const newRemovedItems = [currencyId, ...removedItems];
    setRemovedItems(newRemovedItems)
  }

  const handleReset = () => {
    setRemovedItems([]);
  }

  const renderTableItem = (balance: Balance, i: number, itemIndex: number) => {
    const { currencyId = '', amount = '' } = balance;
    const isEmpty = currencyId === '';
    const currency = isEmpty ? '' : CurrencyUtil.mapCurrencyIdToName(currencyId);
    const isOdd = i % 2;
  
    return (
      <div key={`${itemIndex}-item`} className={`${isOdd ? '' : 'bg-slate-200'} flex w-full justify-between px-5 py-2 min-w-40`}>
        <div className="relative font-semibold text-gray-800 flex items-center justify-center">
          {currency}
          { !isEmpty ? (
            <button
              className="absolute left-12 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center hover:bg-red-700 focus:outline-none transition duration-200"
              onClick={ () => handleRemoveItem(currencyId) }
            >
              <span className="text-lg font-normal">×</span>
            </button>
          ) : null }
        </div>
        <div className="text-right">{amount}</div>
      </div>
    );
  }
  
  const renderTableRow = (rows: Balance[], index: number) => {
    return (
      <div key={`${index}-row`} className="row flex justify-between border-gray-200">
        { rows.map((item, itemIndex) => (renderTableItem(item, index, itemIndex))) }
      </div>
    );
  }
  
  const renderTableHeader = (columnsCount: number) => {
    const columns = [];
  
    for (let i = 0; i < columnsCount; i++) {
      columns.push(
        <div key={`${i}-header`} className="flex w-full justify-between px-5 min-w-40">
          <div>Name</div>
          <div className="text-right">Balance</div>
        </div>
      );
    }
  
    return (
      <div className="flex justify-between py-2">
        { columns }
      </div>
    );
  }

  const renderTableContent = () => {
    if (loading) {
      return <Loader loading={ loading } />;
    }

    if (error) {
      return <Notification message={ error } message_type="error" />;
    }

    return (
      <>
        <div className="mb-4 flex items-center w-full md:w-auto">
          <div className="w-full flex flex-col md:flex-row md:w-auto">
            <button
              onClick={handleReset}
              className="w-full whitespace-nowrap mb-4 bg-blue-500 text-white py-2 px-8 mr-4 md:w-auto md:mb-0 rounded hover:bg-blue-600"
            >
              Return deleted
            </button>
            <input
              type="text"
              placeholder="Filter by currency symbol"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full mb-4 border border-gray-300 p-2 rounded md:mb-0"
            />
            <div className="flex items-center w-full">
              <button
                onClick={handleAddColumn}
                className="w-full mr-4 bg-blue-500 text-white p-2 min-w-10 md:ml-4 md:w-auto md:mr-0 rounded hover:bg-blue-600"
              >
                +
              </button>
              <button
                onClick={handleRemoveColumn}
                className="w-full bg-red-500 text-white p-2 min-w-10 md:ml-4 md:w-auto rounded hover:bg-red-600"
              >
                -
              </button>
            </div>
          </div>
        </div>
        <div className="min-w-full bg-white border border-gray-300 overflow-auto">
          { renderTableHeader(columns) }
          { balancesChunks.map((chunk, index) => (renderTableRow(chunk, index))) }
        </div>
      </>
    );
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4"> { title }</h1>
      { renderTableContent() }
    </div>
  );
};
