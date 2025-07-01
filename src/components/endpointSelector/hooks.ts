import { useState, useRef, useEffect } from "react";
import { endpointSuggestions } from "./utils";
import useEndpointStore from "@states/selectedEndpoint/store";
import { useFuzzySearch } from "@hooks/useFuzzySearch";

const useEndpointSelector = () => {
  const { value, setValue } = useEndpointStore();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { filteredItems: filteredSuggestions, highlightText } = useFuzzySearch({
    items: endpointSuggestions,
    searchTerm,
    getSearchableText: (item: string) => item,
    hasSearched,
  });

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    setSearchTerm(inputValue);
    setHasSearched(true);
    setIsOpen(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setValue(suggestion);
    setSearchTerm("");
    setHasSearched(false);
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    inputRef.current?.select();
    setSearchTerm("");
    setHasSearched(false);
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setSearchTerm("");
      setHasSearched(false);
    }, 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setSearchTerm("");
      setHasSearched(false);
      inputRef.current?.blur();
    }
  };

  const handleDropdownToggle = () => {
    if (!isOpen) {
      setSearchTerm(value);
    }
    setIsOpen(!isOpen);
  };

  return {
    state: {
      value,
      isOpen,
      searchTerm,
      filteredSuggestions,
    },
    
    refs: {
      dropdown: dropdownRef,
      input: inputRef,
    },
    
    handlers: {
      inputChange: handleInputChange,
      suggestionClick: handleSuggestionClick,
      inputFocus: handleInputFocus,
      inputBlur: handleInputBlur,
      keyDown: handleKeyDown,
      dropdownToggle: handleDropdownToggle,
    },
    
    utils: {
      highlightText,
    },
  };
};

export default useEndpointSelector;