// Currency formatting based on locale
export const formatCurrency = (amount: number, currencyCode: string = 'INR', locale: string = 'en-IN'): string => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  } catch (error) {
    // Fallback to simple formatting if Intl fails
    return `${currencyCode} ${amount.toFixed(2)}`;
  }
};

// Currency symbols mapping
export const currencySymbols: Record<string, string> = {
  'INR': '₹',
  'USD': '$',
  'EUR': '€',
  'GBP': '£',
  'JPY': '¥',
  'AUD': 'A$',
  'CAD': 'C$',
  'CHF': 'CHF',
  'CNY': '¥',
  'SEK': 'kr',
  'NZD': 'NZ$',
  'MXN': 'MX$',
  'SGD': 'S$',
  'HKD': 'HK$',
  'NOK': 'kr',
  'KRW': '₩',
  'TRY': '₺',
  'RUB': '₽',
  'BRL': 'R$',
  'ZAR': 'R',
  'SAR': '﷼',
  'AED': 'د.إ',
  'ARS': '$',
  'CLP': '$',
  'COP': '$',
  'PEN': 'S/',
  'UYU': '$U'
};

// Get currency symbol based on currency code
export const getCurrencySymbol = (currencyCode: string): string => {
  return currencySymbols[currencyCode] || currencyCode;
};

// Default currency by country
export const defaultCurrencyByCountry: Record<string, string> = {
  'IN': 'INR',
  'US': 'USD',
  'GB': 'GBP',
  'EU': 'EUR',
  'JP': 'JPY',
  'AU': 'AUD',
  'CA': 'CAD',
  'CH': 'CHF',
  'CN': 'CNY',
  'SE': 'SEK',
  'NZ': 'NZD',
  'MX': 'MXN',
  'SG': 'SGD',
  'HK': 'HKD',
  'NO': 'NOK',
  'KR': 'KRW',
  'TR': 'TRY',
  'RU': 'RUB',
  'BR': 'BRL',
  'ZA': 'ZAR',
  'SA': 'SAR',
  'AE': 'AED',
  'AR': 'ARS',
  'CL': 'CLP',
  'CO': 'COP',
  'PE': 'PEN',
  'UY': 'UYU'
};