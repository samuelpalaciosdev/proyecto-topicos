type ChisteData = {
  id?: string;
  text: string;
  autor?: string;
  puntaje: number;
  categoria: "dad-joke" | "humor-negro" | "chistoso" | "malo";
};

/**
 * 0: Conseguir todos los chistes
 */
export async function fetchChiste(
  id?: string,
): Promise<ChisteData | ChisteData[]> {
  const response = await fetch(`/api/chistes/${id}`);

  if (!response.ok) {
    throw new Error("Fallo al conseguir los chistes");
  }

  return response.json();
}

export async function crearChiste(chiste: ChisteData): Promise<ChisteData> {
  const response = await fetch("api/chistes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(chiste),
  });

  if (!response.ok) {
    throw new Error("No se pudo crear el chiste");
  }

  return response.json();
}
