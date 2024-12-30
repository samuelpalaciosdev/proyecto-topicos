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
import { crearChiste, deleteChiste, fetchChiste, putChiste } from "../api/api";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChisteData } from "../api/api";
import { PuntajeForm } from "./puntaje-form";
import { CategoriaForm } from "./categoria-form";

const optionsReq: string[] = ["POST", "GET", "PUT", "DELETE"];
const optionsGet: string[] = ["ID", "FUENTE", "PUNTAJE", "CATEGORIA"];
const fuentesGet: string[] = ["DAD", "CHUCK", "PROPIO"];

export function ChisteForm() {
  const [result, setResult] = useState<
    string | ChisteData | ChisteData[] | null
  >(null);
  const [getValue, setGetValue] = useState<string>(optionsGet[0]);
  const [fuenteValue, setFuenteValue] = useState<string>(fuentesGet[0]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      method: "GET",
      id: "",
      texto: "",
      autor: "",
      puntaje: 5,
      categoria: "chistoso",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setResult(null);

    console.log(getValue);

    try {
      let response;

      switch (values.method) {
        case "GET":
          // Si es FUENTE
          if (getValue === optionsGet[1]) {
            response = await fetchChiste(
              `/fuente/${fuenteValue.toLowerCase()}`
            );
            break;
          }
          // Si es puntaje
          if (getValue === optionsGet[2]) {
            response = await fetchChiste(`?puntaje=${values.puntaje}`);
            break;
          }
          // Si es categoria
          if (getValue === optionsGet[3]) {
            response = await fetchChiste(`?categoria=${values.categoria}`);
            break;
          }

          response = await fetchChiste(`/${values.id}`);
          break;
        case "POST":
          response = await crearChiste({
            texto: values.texto!,
            autor: values.autor,
            puntaje: values.puntaje,
            categoria: values.categoria,
          });
          break;
        case "PUT":
          response = await putChiste({
            id: values.id,
            texto: values.texto!,
            autor: values.autor,
            puntaje: values.puntaje,
            categoria: values.categoria,
          });
          break;
        case "DELETE":
          response = await deleteChiste(values.id);
          break;
      }

      setResult(response);
    } catch (err) {
      console.error(err);
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
        <Form key={form.watch("method")} {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        setResult("");
                      }}
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

            {form.watch("method") === "GET" && (
              <>
                <FormItem>
                  <FormLabel>Selecciona el GET</FormLabel>
                  <Select
                    value={getValue}
                    onValueChange={(value) => setGetValue(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una opción de GET" />
                    </SelectTrigger>

                    <SelectContent>
                      {optionsGet.map((item, index) => (
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
                  <FormDescription>
                    Aqui vas a elegir el tipo de búsqueda que quieres utilizar
                  </FormDescription>
                  <FormMessage />
                </FormItem>

                {/* En caso de que sea una FUENTE */}
                {getValue === "FUENTE" && (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => setFuenteValue(value)}
                        defaultValue={fuenteValue}
                        className="flex flex-col space-y-1"
                      >
                        {fuentesGet.map((fuente, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem value={fuente} id={fuente} />
                            <Label htmlFor={fuente}>{fuente}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}

                {/* En caso de que sea PUNTAJE */}
                {getValue === "PUNTAJE" && (
                  <PuntajeForm control={form.control} />
                )}

                {/* En caso de que sea CATEGORIA */}
                {getValue === "CATEGORIA" && (
                  <CategoriaForm control={form.control} />
                )}
              </>
            )}

            {/* En caso de que quiera buscar por ID, PUT, DELETE */}

            {((getValue === "ID" && form.watch("method") === "GET") ||
              form.watch("method") === "DELETE" ||
              form.watch("method") === "PUT") && (
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
                      Se requiere para el GET, PUT y DELETE
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
                  name="texto"
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
                <PuntajeForm control={form.control} />

                {/* Categoria */}
                <CategoriaForm control={form.control} />
              </>
            )}

            <FormItem className="flex flex-col">
              {form.watch("method") === "GET" && getValue === "ID" && (
                <FormLabel className="text-red-400">
                  Si presionas Enviar sin ID, se retornaran todos los elementos
                  de la DB
                </FormLabel>
              )}
              <Button type="submit" className="w-20">
                Enviar
              </Button>
            </FormItem>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        {result && (
          <pre
            className="mt-4 p-4 bg-gray-800 text-white rounded"
            style={{
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </CardFooter>
    </Card>
  );
}
