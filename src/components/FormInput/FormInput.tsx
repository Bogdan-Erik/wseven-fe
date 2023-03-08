import React from "react";
import { twMerge } from "tailwind-merge";
import { ErrorText } from "../ErrorText";
import { Input } from "../Input";
import { Label } from "../Label";
import { Loader } from "../Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useField } from "formik";
import "./FormInput.css";

export interface FormInputProps {
  name: string;
  label?: string;
  type?: string;
  error?: string | undefined;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  value?: string;
  isLoading?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: any;
  max?: any;
  step?: number;
  subStep?: number;
}

export const FormInput = ({
  name = "",
  label = "",
  type = "text",
  error = "",
  placeholder = "",
  required = false,
  disabled = false,
  className = "",
  isLoading = false,
  min,
  max,
  step = 1,
  subStep = 1,
  ...props
}: FormInputProps): JSX.Element => {
  const [field, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;

  const classes = twMerge(`
    flex flex-col my-2
    ${className}
  `);

  const isDisabled = () => {
    if (isLoading) {
      return true;
    }
    return disabled;
  };

  const setNumValue = (
    value:any,
    type:any = "plus",
  ) => {
    if (type === "plus") {
      setValue((Math.round((parseFloat(value) + (subStep ?? 1)) * 100) / 100));
    } else {
      if (min) {
        if (min > parseFloat(value) - (subStep ?? 1)) {
          setValue(min);
        } else {
          setValue((Math.round((parseFloat(value) - (subStep ?? 1)) * 100) / 100));
        }
      } else {
        setValue((Math.round((parseFloat(value) - (subStep ?? 1)) * 100) / 100));
      }
    }
  };

  return (
    <div className={classes}>
      {label && <Label required={required}>{label}</Label>}
      <div className="relative">
        {isLoading ? (
          <div className="absolute right-[.625rem] top-[0.5rem]">
            <Loader size={"1.4rem"} style={{}} />
          </div>
        ) : (
          ""
        )}
        <div className="mt-[5px] relative">
          {type === "number" && (
            <div className="absolute right-[10px] top-0">
              <div>
                <FontAwesomeIcon
                  icon={faChevronUp}
                  className="text-[12px] hover:text-rgba-grey-02 cursor-pointer"
                  onClick={() => setNumValue(value, 'plus')}
                />
              </div>
              <div>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="text-[12px] hover:text-rgba-grey-02 cursor-pointer"
                  onClick={() => setNumValue(value, 'minus')}
                />
              </div>
            </div>
          )}
          <Input
            name={name}
            type={type}
            min={min}
            max={max}
            disabled={isDisabled()}
            placeholder={placeholder}
            step={step}
            {...props}
          />
        </div>
      </div>

      <ErrorText>{error}</ErrorText>
    </div>
  );
};
