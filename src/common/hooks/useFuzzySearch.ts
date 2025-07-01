import { useMemo } from 'react';

export type TextPart = string | { text: string; highlight: boolean };

interface FuzzySearchOptions {
  caseSensitive?: boolean;
  exactMatchBonus?: number;
  startsWithBonus?: number;
  containsBonus?: number;
  wordCountBonus?: number;
}

const defaultOptions: FuzzySearchOptions = {
  caseSensitive: false,
  exactMatchBonus: 100,
  startsWithBonus: 50,
  containsBonus: 10,
  wordCountBonus: 5,
};

const fuzzySearch = (searchTerm: string, targetString: string, options: FuzzySearchOptions = {}): boolean => {
  if (!searchTerm.trim()) return true;
  
  const { caseSensitive } = { ...defaultOptions, ...options };
  const searchWords = (caseSensitive ? searchTerm : searchTerm.toLowerCase())
    .split(/\s+/)
    .filter(word => word.length > 0);
  const target = caseSensitive ? targetString : targetString.toLowerCase();
  
  return searchWords.every(word => target.includes(word));
};

const calculateRelevance = (searchTerm: string, targetString: string, options: FuzzySearchOptions = {}): number => {
  if (!searchTerm.trim()) return 0;
  
  const { 
    caseSensitive, 
    exactMatchBonus, 
    startsWithBonus, 
    containsBonus, 
    wordCountBonus 
  } = { ...defaultOptions, ...options };
  
  const searchWords = (caseSensitive ? searchTerm : searchTerm.toLowerCase())
    .split(/\s+/)
    .filter(word => word.length > 0);
  const target = caseSensitive ? targetString : targetString.toLowerCase();
  let score = 0;
  
  searchWords.forEach(word => {
    if (target === word) {
      score += exactMatchBonus!;
    } else if (target.startsWith(word)) {
      score += startsWithBonus!;
    } else if (target.includes(word)) {
      const position = target.indexOf(word);
      score += Math.max(containsBonus! - position / 10, 1);
    }
  });
  
  score += searchWords.length * wordCountBonus!;
  
  return score;
};

const highlightMatch = (text: string, searchTerm: string, shouldHighlight: boolean = true): TextPart[] => {
  if (!searchTerm.trim() || !shouldHighlight) return [text];
  
  const words = searchTerm.toLowerCase().split(/\s+/).filter(word => word.length > 0);
  let parts: TextPart[] = [text];
  
  words.forEach(word => {
    const newParts: TextPart[] = [];
    
    parts.forEach(part => {
      if (typeof part === 'string') {
        const regex = new RegExp(`(${word})`, 'gi');
        const splitParts = part.split(regex);
        
        splitParts.forEach((splitPart, index) => {
          if (splitPart) {
            if (index % 2 === 1) {
              newParts.push({ text: splitPart, highlight: true });
            } else {
              newParts.push(splitPart);
            }
          }
        });
      } else {
        newParts.push(part);
      }
    });
    
    parts = newParts;
  });
  
  return parts;
};

interface UseFuzzySearchProps<T> {
  items: T[];
  searchTerm: string;
  getSearchableText: (item: T) => string;
  hasSearched?: boolean;
  options?: FuzzySearchOptions;
}

interface UseFuzzySearchReturn<T> {
  filteredItems: T[];
  highlightText: (text: string, shouldHighlight?: boolean) => TextPart[];
}

export const useFuzzySearch = <T>({
  items,
  searchTerm,
  getSearchableText,
  hasSearched = true,
  options = defaultOptions,
}: UseFuzzySearchProps<T>): UseFuzzySearchReturn<T> => {
  const filteredItems = useMemo(() => {
    if (!hasSearched || !searchTerm.trim()) {
      return items;
    }

    return items
      .filter(item => fuzzySearch(searchTerm, getSearchableText(item), options))
      .map(item => ({
        item,
        relevance: calculateRelevance(searchTerm, getSearchableText(item), options)
      }))
      .sort((a, b) => b.relevance - a.relevance)
      .map(({ item }) => item);
  }, [items, searchTerm, hasSearched, getSearchableText, options]);

  const highlightText = useMemo(() => {
    return (text: string, shouldHighlight: boolean = hasSearched) => 
      highlightMatch(text, searchTerm, shouldHighlight);
  }, [searchTerm, hasSearched]);

  return {
    filteredItems,
    highlightText,
  };
};