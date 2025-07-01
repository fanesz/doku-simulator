export const formatResponse = (data: unknown) => {
  try {
    return JSON.stringify(data, null, 2);
  } catch {
    return String(data);
  }
};

export const getStatusCodeColor = (status?: number) => {
  if (!status) return "text-gray-500";
  if (status >= 200 && status < 300) return "text-green-600";
  if (status >= 400 && status < 500) return "text-orange-600";
  if (status >= 500) return "text-red-600";
  return "text-blue-600";
};

export const parseInquiryXML = (xmlString: string) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");
  
  const getValue = (tagName: string) => {
    const element = xmlDoc.getElementsByTagName(tagName)[0];
    return element ? element.textContent || "" : "";
  };

  return {
    paymentCode: getValue("PAYMENTCODE"),
    amount: getValue("AMOUNT"),
    purchaseAmount: getValue("PURCHASEAMOUNT"),
    minAmount: getValue("MINAMOUNT"),
    maxAmount: getValue("MAXAMOUNT"),
    transIdMerchant: getValue("TRANSIDMERCHANT"),
    words: getValue("WORDS"),
    requestDateTime: getValue("REQUESTDATETIME"),
    currency: getValue("CURRENCY"),
    purchaseCurrency: getValue("PURCHASECURRENCY"),
    sessionId: getValue("SESSIONID"),
    name: getValue("NAME"),
    email: getValue("EMAIL"),
    basket: getValue("BASKET"),
    additionalData: getValue("ADDITIONALDATA"),
    responseCode: getValue("RESPONSECODE"),
  };
};
