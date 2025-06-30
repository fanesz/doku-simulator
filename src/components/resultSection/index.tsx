import { ContentType } from "@enums/index";
import useInquiryStore from "@states/inquiry/store";
import usePaymentStore from "@states/payment/store";
import clsx from "clsx";
import { formatResponse, getStatusCodeColor } from "./utils";

interface ResultSectionProps {
  activeTab: ContentType;
}

const ResultSection = (props: ResultSectionProps) => {
  const { activeTab } = props;

  const { result: inquiryResult } = useInquiryStore();
  const { result: paymentResult } = usePaymentStore();

  const currentResult =
    activeTab === ContentType.Inquiry ? inquiryResult : paymentResult;
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Result</h2>

      {currentResult ? (
        <div className="space-y-4">
          {/* Status Code */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">
              Status Code:
            </span>
            <span
              className={clsx(
                "text-sm font-bold",
                getStatusCodeColor(currentResult.status)
              )}
            >
              {currentResult.status}
            </span>
          </div>

          {/* Response Data */}
          <div>
            <span className="text-sm font-medium text-gray-600 block mb-2">
              Response:
            </span>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 overflow-auto max-h-96">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                {formatResponse(currentResult.data)}
              </pre>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-gray-500 text-sm">
          No result available. Please make a request first.
        </div>
      )}
    </div>
  );
};

export default ResultSection;
