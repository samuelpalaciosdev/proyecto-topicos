import { Control } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { formSchema } from "../utils/schema";
import * as z from "zod";

type FormValues = z.infer<typeof formSchema>;

interface FormPuntajeProps {
  control: Control<FormValues>;
}

const categoriaReq = ["dad-joke", "humor-negro", "chistoso", "malo"];

export function CategoriaForm({ control }: FormPuntajeProps) {
  return (
    <FormField
      control={control}
      name="categoria"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Categoría</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="flex items-center space-x-2">
              <SelectValue placeholder="Selecciona una categoria" />
            </SelectTrigger>

            <SelectContent>
              {categoriaReq.map((item, index) => (
                <SelectItem
                  key={index}
                  value={item}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
