import React, { FC } from "react";

export type SelectOption = {
  value: string | number;
  disabled?: boolean;
  children: string | number;
};

interface SelectProps {
  options: SelectOption[];
  disabled?: boolean;
  onChange: (event: React.SyntheticEvent<HTMLSelectElement>) => void;
  value: string | number;
  name: string;
}

const Select: FC<SelectProps> = ({
  name,
  options,
  disabled,
  onChange,
  value,
}) => {
  return (
    <select name={name} disabled={disabled} onChange={onChange} value={value}>
      {options.map((option) => (
        <option key={option.value} {...option} />
      ))}
    </select>
  );
};

export default Select;
