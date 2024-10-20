class BalanceService {
  async getBalances(endpoint: string): Promise<any> {
    try {
      const response = await fetch(`https://653fb0ea9e8bd3be29e10cd4.mockapi.io/api/v1${endpoint}`);
      if (!response.ok) {
        return { error: 'Failed to fetch balances' }
      }
      const balances = await response.json();

      return { balances };
    } catch (error) {
      
      return { error }
    }
  }
}

export default new BalanceService();
