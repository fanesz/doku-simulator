import ActionButton from "@commonComponents/ActionButton";
import InputField from "@commonComponents/Input";
import { inputFields } from "./utils";
import usePayment from "./hooks";

const PaymentContent: React.FC = () => {
  const {
    formData,
    handleInputChange,
    handleSubmit,
    handleClear,
    handlePasteInput,
  } = usePayment();

  return (
    <div className="space-y-6">
      {inputFields.map((field, idx) => (
        <InputField
          key={idx}
          label={field.label}
          value={formData[field.key]}
          placeholder={field.placeholder}
          onChange={(value) => handleInputChange(field.key, value)}
          onPaste={() => handlePasteInput(field.key)}
        />
      ))}

      {/* Action Buttons */}
      <div className="flex space-x-4 pt-6">
        <ActionButton onClick={handleSubmit} variant="primary">
          SUBMIT
        </ActionButton>
        <ActionButton onClick={handleClear} variant="secondary">
          CLEAR
        </ActionButton>
        {/* !! not implemented yet
        <ActionButton onClick={handleCentral} variant="primary">
          CENTRAL
        </ActionButton> */}
      </div>
    </div>
  );
};

export default PaymentContent;
