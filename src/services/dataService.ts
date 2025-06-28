export interface SalaryEntry {
  value: number;
  category: string;
  metadata: {
    Country: string;
    Language: string;
    Experience: string;
    Salary: string;
  };
}

export interface LanguageData {
  entries: SalaryEntry[];
}

export interface CountryData {
  [language: string]: LanguageData;
}

export interface SalaryData {
  [country: string]: CountryData;
}

export interface ProcessedSalaryRange {
  [experienceLevel: string]: [number, number];
}

let cachedData: SalaryData | null = null;

export async function loadSalaryData(): Promise<SalaryData> {
  if (cachedData) {
    return cachedData;
  }

  try {
    // Use window.location.origin to construct the full URL in browsers
    // In test environments, this will be handled by mocks
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const url = `${baseUrl}/calculatorData.json`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    
    cachedData = await response.json();
    return cachedData!;
  } catch (error) {
    console.error('Error loading salary data:', error);
    throw error;
  }
}

export function getAvailableCountries(data: SalaryData): string[] {
  return Object.keys(data).sort();
}

export function getAvailableLanguages(data: SalaryData): string[] {
  const languagesSet = new Set<string>();
  
  Object.values(data).forEach(countryData => {
    Object.keys(countryData).forEach(language => {
      languagesSet.add(language);
    });
  });
  
  return Array.from(languagesSet).sort();
}

export function processDataForChart(
  data: SalaryData,
  country: string,
  language: string
): ProcessedSalaryRange {
  const countryData = data[country];
  if (!countryData) {
    return {};
  }

  const languageData = countryData[language];
  if (!languageData) {
    return {};
  }

  // Group entries by experience level
  const groupedByExperience: { [key: string]: number[] } = {};
  
  languageData.entries.forEach(entry => {
    const experience = entry.category;
    if (!groupedByExperience[experience]) {
      groupedByExperience[experience] = [];
    }
    groupedByExperience[experience].push(entry.value);
  });

  // Calculate min and max for each experience level
  const result: ProcessedSalaryRange = {};
  
  Object.keys(groupedByExperience).forEach(experience => {
    const salaries = groupedByExperience[experience];
    const min = Math.min(...salaries);
    const max = Math.max(...salaries);
    result[experience] = [min, max];
  });

  return result;
}

export function getExperienceLevels(data: SalaryData): string[] {
  const levelsSet = new Set<string>();
  
  Object.values(data).forEach(countryData => {
    Object.values(countryData).forEach(languageData => {
      languageData.entries.forEach(entry => {
        levelsSet.add(entry.category);
      });
    });
  });
  
  // Define the order of experience levels
  const orderMap: { [key: string]: number } = {
    '<1 year': 0,
    '1–2 years': 1,
    '3–5 years': 2,
    '6–10 years': 3,
    '11–16 years': 4,
    '16+ years': 5
  };
  
  return Array.from(levelsSet).sort((a, b) => {
    const orderA = orderMap[a] ?? 999;
    const orderB = orderMap[b] ?? 999;
    return orderA - orderB;
  });
}