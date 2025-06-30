import { useState, useRef, useEffect } from "react";
import { endpointSuggestions } from "./utils";
import clsx from "clsx";
import useEndpointStore from "@states/selectedEndpoint/store";

interface EndpointSelectorProps {
  className?: string;
}

const EndpointSelector: React.FC<EndpointSelectorProps> = (props) => {
  const { className = "" } = props;

  const { value, setValue } = useEndpointStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    setIsOpen(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setValue(suggestion);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className={clsx("relative", className)} ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        API Endpoint URL
      </label>

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder="Enter custom endpoint or select from suggestions"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
        />

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <svg
            className={clsx(
              "w-5 h-5 transition-transform",
              isOpen ? "rotate-180" : ""
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {isOpen && endpointSuggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {endpointSuggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className={clsx(
                "w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors border-b border-gray-100 last:border-b-0",
                value === suggestion ? "bg-gray-100 font-semibold" : "bg-white"
              )}
            >
              <span className="text-gray-900">{suggestion}</span>
            </button>
          ))}
        </div>
      )}

      {isOpen && endpointSuggestions.length === 0 && value && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="px-4 py-3 text-gray-500 text-sm">
            No suggestions found
          </div>
        </div>
      )}

      <label className="block text-xs font-medium text-gray-700 mt-1">
        Note: by add /* at the end of url, will auto add /notify or /inquiry, if not, will execute the inputed url
      </label>
    </div>
  );
};

export default EndpointSelector;
