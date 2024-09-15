import DataUriParser from "datauri/parser.js";
import path from "path";

const parser = new DataUriParser();

const getDataUri = (file) => {
    const extName = path.extname(file.originalname).toString();
    const mimetype = file.mimetype;  // Get the mimetype from the file

    // Ensure that the returned string has the format 'data:<mimetype>;base64,<base64_encoded_content>'
    return parser.format(extName, file.buffer).content;
};

export default getDataUri;
