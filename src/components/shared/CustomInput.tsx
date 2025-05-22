import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";

type CustomInputProps = {
  label?: string;
  type:string,
  placeholder?: string;
  name: string;
  required?:boolean
}

const CustomInput = ({
  label,
  type,
  placeholder,
  name,
  required
}: CustomInputProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1">
          {label && <FormLabel className="text-black">{label}</FormLabel>}
          <FormControl>
            <Input
            type={type}
            required={required}
              placeholder={placeholder}
              {...field}
              className="p-2 text-gray-500 border-t-none border-r-none border-b-[1px] focus:outline-none focus:ring-0 focus:border-b-[1px]"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomInput;
