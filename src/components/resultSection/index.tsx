import { ContentType } from "@enums/index";
import useInquiryStore from "@states/inquiry/store";
import usePaymentStore from "@states/payment/store";
import clsx from "clsx";
import { formatResponse, getStatusCodeColor, parseInquiryXML } from "./utils";
import DisplayField from "./partial/displayField";
import SimpleField from "./partial/simpleField";

interface ResultSectionProps {
  activeTab: ContentType;
}

const ResultSection = (props: ResultSectionProps) => {
  const { activeTab } = props;

  const { result: inquiryResult } = useInquiryStore();
  const { result: paymentResult } = usePaymentStore();

  const currentResult =
    activeTab === ContentType.Inquiry ? inquiryResult : paymentResult;

  const isInquiryWithXML =
    activeTab === ContentType.Inquiry &&
    currentResult?.data &&
    typeof currentResult.data === "string" &&
    currentResult.data.includes("<INQUIRY_RESPONSE>");

  let parsedData = null;
  if (isInquiryWithXML) {
    try {
      parsedData = parseInquiryXML(currentResult.data as string);
    } catch (error) {
      console.error("Failed to parse XML:", error);
    }
  }

  const priorityFields = parsedData
    ? [
        { label: "Amount", value: parsedData.amount },
        { label: "Transaction ID", value: parsedData.transIdMerchant },
        { label: "Name", value: parsedData.name },
        { label: "Email", value: parsedData.email },
        { label: "Payment Code", value: parsedData.paymentCode },
      ]
    : [];

  const otherFields = parsedData
    ? [
        { label: "Purchase Amount", value: parsedData.purchaseAmount },
        { label: "Min Amount", value: parsedData.minAmount },
        { label: "Max Amount", value: parsedData.maxAmount },
        { label: "Currency", value: parsedData.currency },
        { label: "Purchase Currency", value: parsedData.purchaseCurrency },
        { label: "Session ID", value: parsedData.sessionId },
        { label: "Request DateTime", value: parsedData.requestDateTime },
        { label: "Additional Data", value: parsedData.additionalData },
        { label: "Response Code", value: parsedData.responseCode },
        {
          label: "Basket",
          value: parsedData.basket,
          className: "md:col-span-2",
        },
        { label: "Words", value: parsedData.words, className: "md:col-span-2" },
      ]
    : [];

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

            {isInquiryWithXML && parsedData ? (
              <div className="space-y-4">
                {/* Top Priority Fields */}
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {priorityFields.map((field, index) => (
                      <DisplayField
                        key={index}
                        label={field.label}
                        value={field.value}
                        showCopy={true}
                      />
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200" />

                {/* Other Fields */}
                <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    {otherFields.map((field, index) => (
                      <SimpleField
                        key={index}
                        label={field.label}
                        value={field.value}
                        className={field.className}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Default formatting for non-inquiry or non-XML data
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 overflow-auto max-h-96">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                  {formatResponse(currentResult.data)}
                </pre>
              </div>
            )}
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
