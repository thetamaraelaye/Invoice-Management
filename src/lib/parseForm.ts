import * as formidable from "formidable";
import { IncomingForm } from "formidable";
import { NextApiRequest } from "next";

// Configure formidable to handle files and fields
const form = new IncomingForm({
  multiples: true, // Allow multiple file uploads
  keepExtensions: true, // Keep file extensions
});

export function parseForm(
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}
