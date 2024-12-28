import mongoose from "mongoose";

// Valida que el id pasado sea uno válido de mongoose
export function checkValidObjectId(id: string): boolean {
  if (!mongoose.isValidObjectId(id)) {
    return false;
  }

  return true;
}
