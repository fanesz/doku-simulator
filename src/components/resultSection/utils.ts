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