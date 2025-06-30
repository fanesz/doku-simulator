import ActionButton from "@commonComponents/Button";
import InputField from "@commonComponents/Input";
import { inputFields } from "./utils";
import useInquiry from "./hooks";

const InquireContent: React.FC = () => {
  const {
    formData,
    handleInputChange,
    handleSubmit,
    handleClear,
    handlePasteInput,
  } = useInquiry();

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
      </div>
    </div>
  );
};

export default InquireContent;
