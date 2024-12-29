"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { formSchema } from "../utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { crearChiste, fetchChiste } from "../api/api";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const optionsReq = ["POST", "GET", "PUT"];
const categoriaReq = ["dad-joke", "humor-negro", "chistoso", "malo"];

export function ChisteForm() {
  const [result, setResult] = useState<any>(null);

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setResult(null);

    try {
      let response;

      switch (values.method) {
        case "GET":
          response = await fetchChiste(values.id);
          break;
        case "PUT":
          if (!values.id)
            throw new Error(
              "el ID es requerido para buscar poder hacer el PUT request"
            );
          response = "Wait";
          // Por desarrollar
          break;
        case "POST":
          response = await crearChiste({
            texto: values.texto,
            autor: values.autor,
            puntaje: values.puntaje,
            categoria: values.categoria,
          });
          break;
      }

      setResult(response);
    } catch (err) {
      console.error(err);
      setResult({
        error: "Ocurrio un error",
      });
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Crea tu Chiste!!</CardTitle>
        <CardDescription>Gestiona los chistes aquí</CardDescription>
      </CardHeader>

      {/* Contenido de la card */}
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                {/* Texto */}
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Texto del chiste</FormLabel>

                      <FormControl>
                        <Textarea
                          placeholder="Escribe el chiste aquí"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Autor */}
                <FormField
                  control={form.control}
                  name="autor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Autor</FormLabel>
                      <FormControl>
                        <Input placeholder="Autor del chiste" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Puntaje */}
                <FormField
                  control={form.control}
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
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Categoria */}
                {/* <FormField
                  control={form.control}
                  name="categoria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoría</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una categoría" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="dad-joke">Dad Joke</SelectItem>
                          <SelectItem value="humor-negro">
                            Humor Negro
                          </SelectItem>
                          <SelectItem value="chistoso">Chistoso</SelectItem>
                          <SelectItem value="Malo">malo</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                <FormField
                  control={form.control}
                  name="categoria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoría</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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
              </>
            )}

            <Button type="submit">Enviar</Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        {result && (
          <pre className="mt-4 p-4 bg-gray-800 text-white rounded">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </CardFooter>
    </Card>
  );
}
