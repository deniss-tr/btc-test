"use client";
import { useEffect, useState } from 'react';
import BalanceService from '../app/services/balanceService';
import Table from '../app/components/Table';

export default function HomePage() {
  const [firstTableData, setFirstTableData] = useState({ balances: [], error: null, loading: true });
  const [secondTableData, setSecondTableData] = useState({ balances: [], error: null, loading: true });

  useEffect(() => {
    async function fetchBalances() {
      const data = await BalanceService.getBalances('/currencies');
      setFirstTableData({ ...data, loading: false });
    }
    fetchBalances();

    async function fetchNotFOund() {
      const data = await BalanceService.getBalances('/not-found');
      setSecondTableData({ ...data, loading: false });
    }
    fetchNotFOund();
  }, []);

  return (
    <div>
      <Table
        title="Balances"
        balances={ firstTableData.balances }
        error={ firstTableData.error }
        loading={ firstTableData.loading }
      />
      <Table
        title="Balances not found"
        balances={ secondTableData.balances }
        error={ secondTableData.error }
        loading={ secondTableData.loading }
      />
    </div>
  );
}
