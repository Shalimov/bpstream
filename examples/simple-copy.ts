import { pipeline } from "stream";
import { createWriteStream, readFileSync } from "fs";

import { BPReadableStream } from "../src/index";

function checkSimpleBuffer() {
  const file = readFileSync(__dirname + "./files/exampleobj.pdf");

  pipeline(
    BPReadableStream.from(file, { chunkSize: 512 * 1024 }),
    createWriteStream(__dirname + "./files/copy.pdf"),
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Gotta");
      }
    }
  );
}

checkSimpleBuffer();
