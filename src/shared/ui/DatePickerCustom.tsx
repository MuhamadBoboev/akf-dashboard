import React, { useEffect, useState } from 'react';
import { Control, Controller, ControllerRenderProps } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { FieldValues } from 'react-hook-form/dist/types';
import ModalFormControl from './ModalFormControl';
import { format, parse } from 'date-fns';

export interface DateTimePickerCustomProps {
  errorMessage?: string;
  name: string;
  control: Control<any>;
  label?: string;
  required?: boolean;
  valueDate?: string | null
  datePickerProps?(field: ControllerRenderProps<FieldValues, string>): TextFieldProps;
}

function DateTimePickerCustom({
  name,
  required = false,
  errorMessage,
  control,
  label,
  valueDate,
  datePickerProps,
}: DateTimePickerCustomProps) {


  const [value, setValue] = useState(valueDate)

  let parsedDate
  let formattedDate = '2000-10-20'

  useEffect(() => {
    parsedDate = parse(value ? value : 'Sat, 20 Sep 2025 09:00:00 GMT', "EEE, dd MMM yyyy HH:mm:ss 'GMT'", new Date());
    formattedDate = format(parsedDate, 'yyyy-MM-dd');
    setValue(formattedDate)
  }, [0])

  return (
    <ModalFormControl errorMessage={errorMessage}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            field.onChange(event.target.value);
            setValue(event.target.value)
          };

          return (
            <TextField
              label={label}
              error={!!errorMessage}
              type="date"
              InputLabelProps={{ shrink: true }}
              {...field}
              value={value}
              {...(datePickerProps ? datePickerProps(field) : {})}
              onChange={handleChange}
              required={required}

              inputProps={{
                step: 300
              }}
            />
          );
        }}
      />
    </ModalFormControl>
  );
}

export default DateTimePickerCustom;
