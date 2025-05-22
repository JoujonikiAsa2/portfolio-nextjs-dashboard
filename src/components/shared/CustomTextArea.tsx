import React from 'react';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from '@/components/ui/textarea';
import { useFormContext } from 'react-hook-form';

interface CustomTextAreaProps {
  label?: string;
  placeholder?: string;
  description?: string;
  name: string;
  required?:boolean
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({ label, placeholder, description, name, required }) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='space-y-2'>
          <FormLabel className="text-black">{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} required={required} className="w-full p-2 text-gray-500 border-1 border-gray-500 focus:outline-none rounded focus:ring-0 focus:border-none"/>
          </FormControl>
          {description && <FormDescription className="text-xs">{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomTextArea;