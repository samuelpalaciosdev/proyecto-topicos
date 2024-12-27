import mongoose from "mongoose";

export function checkValidObjectId(id: string): boolean {
  if (!mongoose.isValidObjectId(id)) {
    return false;
  }

  return true;
}
