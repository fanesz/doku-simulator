import EndpointSelector from "@components/endpointSelector";
import ResultSection from "@components/resultSection";
import InquireContent from "@components/tabContents/Inquiry";
import PaymentContent from "@components/tabContents/Payment";
import { ContentType } from "@enums/index";
import { useQueryParam } from "@hooks/useQueryParam";
import clsx from "clsx";

const PermataSimulator: React.FC = () => {
  const [tabParam, setTabParam] = useQueryParam('tab', ContentType.Inquiry);
  
  const getValidTab = (param: string): ContentType => {
    const validTabs = [ContentType.Inquiry, ContentType.Payment, ContentType.Reversal];
    return validTabs.find(tab => tab === param) || ContentType.Inquiry;
  };

  const activeTab = getValidTab(tabParam);

  const tabList: ContentType[] = [
    ContentType.Inquiry,
    ContentType.Payment,
    ContentType.Reversal,
  ];

  const tabContentMap = {
    [ContentType.Inquiry]: <InquireContent />,
    [ContentType.Payment]: <PaymentContent />,
    [ContentType.Reversal]: <div>Not Implemented Yet ~</div>,
  };

  const handleTabChange = (newTab: ContentType) => {
    setTabParam(newTab);
  };

  const TabButton = (tabName: ContentType) => {
    return (
      <button
        key={tabName}
        onClick={() => handleTabChange(tabName)}
        className={clsx(
          "px-6 py-3 text-sm font-medium border-b-2 transition-colors",
          activeTab === tabName
            ? "text-red-600 border-red-600"
            : "text-gray-500 border-transparent hover:text-gray-700"
        )}
      >
        {tabName.toUpperCase()}
      </button>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        Permata Simulator
      </h1>

      {/* Endpoint Selector */}
      <div className="mb-8 px-6 py-4 bg-blue-50 rounded-lg border border-blue-200">
        <EndpointSelector className="max-w-2xl" />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8">
        {tabList.map((tab) => TabButton(tab))}
      </div>

      {/* Tab Content */}
      <div className="p-6 bg-gray-100/80 rounded-lg shadow-sm mb-8">
        {tabContentMap[activeTab]}
      </div>

      {/* Result Section */}
      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <ResultSection activeTab={activeTab} />
      </div>
    </div>
  );
};

export default PermataSimulator;