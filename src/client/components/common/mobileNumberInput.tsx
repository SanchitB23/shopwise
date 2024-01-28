import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { countryCodes } from '@/validators/auth-validator';

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  countrySelectName: Path<T>;
  mobileInputName: Path<T>;
}

const MobileNumberInput = <T extends FieldValues>({
  form,
  mobileInputName,
  countrySelectName,
}: Props<T>) => {
  return (
    <div>
      <FormLabel>Mobile Number</FormLabel>
      <section className={'flex space-x-2 mt-2'}>
        <FormField
          control={form.control}
          name={countrySelectName}
          render={({ field }) => (
            <FormItem className={'w-1/5'}>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countryCodes.map(value => (
                    <SelectItem value={value} key={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={mobileInputName}
          render={({ field }) => (
            <FormItem className={'flex-1'}>
              <FormControl>
                <Input placeholder="Enter Mobile Number" {...field} type={'number'} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </section>
    </div>
  );
};

export default MobileNumberInput;
