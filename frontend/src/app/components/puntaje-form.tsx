import {
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "../utils/schema";

type FormValues = z.infer<typeof formSchema>;

interface FormPuntajeProps {
  control: Control<FormValues>;
}

export function PuntajeForm({ control }: FormPuntajeProps) {
  return (
    <FormField
      control={control}
      name="puntaje"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Puntaje</FormLabel>
          <FormControl>
            <Input
              type="number"
              min={1}
              max={10}
              {...field}
              onChange={(e) => field.onChange(parseInt(e.target.value))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
