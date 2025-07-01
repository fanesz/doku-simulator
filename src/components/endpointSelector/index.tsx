import clsx from "clsx";
import useEndpointSelector from "./hooks";

interface EndpointSelectorProps {
  className?: string;
}

const EndpointSelector: React.FC<EndpointSelectorProps> = (props) => {
  const { className = "" } = props;

  const { state, refs, handlers, utils } = useEndpointSelector();

  return (
    <div className={clsx("relative", className)} ref={refs.dropdown}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        API Endpoint URL
      </label>

      <div className="relative">
        <input
          ref={refs.input}
          type="text"
          value={state.value}
          onChange={handlers.inputChange}
          onFocus={handlers.inputFocus}
          onBlur={handlers.inputBlur}
          onKeyDown={handlers.keyDown}
          placeholder="Enter custom endpoint or search suggestions..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
        />

        <button
          type="button"
          onClick={handlers.dropdownToggle}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <svg
            className={clsx(
              "w-5 h-5 transition-transform",
              state.isOpen ? "rotate-180" : ""
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

      {state.isOpen && state.filteredSuggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {state.filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handlers.suggestionClick(suggestion)}
              className={clsx(
                "w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors border-b border-gray-100 last:border-b-0",
                state.value === suggestion
                  ? "bg-gray-100 font-semibold"
                  : "bg-white"
              )}
            >
              <span className="text-gray-900">
                {utils.highlightText(suggestion).map((part, partIndex) => {
                  if (typeof part === "string") {
                    return part;
                  } else if (part.highlight) {
                    return (
                      <mark
                        key={partIndex}
                        className="bg-yellow-200 px-0.5 rounded"
                      >
                        {part.text}
                      </mark>
                    );
                  }
                  return null;
                })}
              </span>
            </button>
          ))}
        </div>
      )}

      {state.isOpen &&
        state.filteredSuggestions.length === 0 &&
        state.searchTerm.trim() && (
          <div
            className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg"
            onMouseDown={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 text-gray-500 text-sm select-none">
              No suggestions found for "{state.searchTerm}"
            </div>
          </div>
        )}

      <label className="block text-xs font-medium text-gray-700 mt-1">
        Note: by add /* at the end of url, will auto add /notify or /inquiry, if
        not, will execute the inputed url
      </label>
    </div>
  );
};

export default EndpointSelector;
