class BalanceService {
  async getBalances(): Promise<any> {
    try {
      const response = await fetch('https://653fb0ea9e8bd3be29e10cd4.mockapi.io/api/v1/currencies');
      if (!response.ok) {
        throw new Error('Failed to fetch balances');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching balances:', error);
      return [];
    }
  }
}

export default new BalanceService();
