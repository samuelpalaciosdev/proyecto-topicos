export type ChisteData = {
  id?: string;
  texto: string;
  autor?: string;
  puntaje: number;
  categoria: "dad-joke" | "humor-negro" | "chistoso" | "malo";
};

const URL = "http://localhost:5000";

/**
 * 0: Conseguir todos los chistes
 */
export async function fetchChiste(
  id?: string
): Promise<ChisteData | ChisteData[]> {
  const response = await fetch(`${URL}/api/chistes/${id}`);

  console.log(response);

  if (!response.ok) {
    throw new Error("Fallo al conseguir los chistes");
  }

  return response.json();
}

export async function crearChiste(chiste: ChisteData): Promise<ChisteData> {
  const response = await fetch(`${URL}/api/chistes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(chiste),
  });

  console.log(JSON.stringify(chiste));

  if (!response.ok) {
    throw new Error("No se pudo crear el chiste");
  }

  return response.json();
}
