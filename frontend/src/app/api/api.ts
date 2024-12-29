export type ChisteData = {
  id?: string;
  texto: string;
  autor?: string;
  puntaje: number;
  categoria: "dad-joke" | "humor-negro" | "chistoso" | "malo";
};

const URL = "http://localhost:5000";

/**
 * 1, 5, 6, 7: Conseguir todos los chistes
 Con este fetch cumple con todos esos requisitos
 */
export async function fetchChiste(req?: string): Promise<ChisteData> {
  /**
   * req: Puede ser ID, query, o la fuente
   */
  const response = await fetch(`${URL}/api/chistes/${req}`);

  if (!response.ok) {
    throw new Error("Fallo al conseguir los chistes");
  }

  return response.json();
}

/**
 * 2: Crear POST
 */

export async function crearChiste(chiste: ChisteData): Promise<ChisteData> {
  const response = await fetch(`${URL}/api/chistes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(chiste),
  });

  if (!response.ok) {
    throw new Error("No se pudo crear el chiste");
  }

  return response.json();
}

/**
 * 3: Hacer PUT
 */

export async function putChiste(chiste: ChisteData): Promise<ChisteData> {
  const response = await fetch(`${URL}/api/chistes`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(chiste),
  });

  if (!response.ok) {
    throw new Error("No se pudo actualizar el chiste");
  }

  return response.json();
}

/**
 * Hacer el DELETE
 */

export async function deleteChiste(id?: string): Promise<null> {
  const response = await fetch(`${URL}/api/chistes/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("No se pudo borrar el chiste de la DB");
  }

  return response.json();
}
