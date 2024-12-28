"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { formSchema } from "../utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";

const optionsReq = ["POST", "GET", "PUT"];

export function ChisteForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      method: "GET",
      texto: "",
      autor: "",
      puntaje: 5,
      categoria: "chistoso",
    },
  });

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Crea tu Chiste!!</CardTitle>
        <CardDescription>Gestiona los chistes aquí</CardDescription>
      </CardHeader>

      {/* Contenido de la card */}
      <CardContent>
        <Form {...form}>
          <form className="space-y-8">
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {optionsReq.map((req, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem value={req} id={req} />
                          <Label htmlFor={req}>{req}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* En caso de GET o PUT */}
            {/* {(form.watch("method") === "GET" ||
              form.watch("method") === "PUT") && ( */}

            {optionsReq[0] == "POST" && (
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID del chiste</FormLabel>
                    <FormControl>
                      <Input placeholder="ID del chiste" {...field} />
                    </FormControl>
                    <FormDescription>
                      Se requiere para el GET y abrir el PUT
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {/* En caso de POST o PUT */}
            {(form.watch("method") === "PUT" ||
              form.watch("method") === "POST") && (
              <>
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Texto del chiste</FormLabel>
                      <FormControl>
                        <Input placeholder="ID del chiste" {...field} />
                      </FormControl>

                      <FormDescription>Requerido para</FormDescription>
                    </FormItem>
                  )}
                />
              </>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
