import apiClient from './apiClient';

const platformService = {
  // Fetch platform information including Founder details & statistics
  getPlatformInfo: async () => {
    try {
      const response = await apiClient.get('/platform/info');
      return response.data;
    } catch (error) {
      console.warn('Fallback to local platform info data');
      return {
        appName: 'KaamChahiye.com',
        tagline: "India's #1 Grassroots Skilled Workforce & Wage Portal",
        founder: 'Faizan Khan',
        founderRole: 'Founder & Chief Executive Officer',
        founderQuote: 'Every skilled karigar in India deserves transparent daily payouts, Aadhaar-backed identity verification, and direct connection with employers without middleman exploitation.',
        establishedYear: 2026,
        headquarters: 'Mumbai, India',
        totalVerifiedWorkers: '5,000+',
        totalWagePayoutsProcessed: '₹1.2+ Crore',
        supportedCitiesCount: 10
      };
    }
  },

  // Fetch operational cities directory
  getCities: async () => {
    try {
      const response = await apiClient.get('/platform/cities');
      return response.data;
    } catch (error) {
      console.warn('Fallback to local cities constant');
      return [];
    }
  }
};

export default platformService;
