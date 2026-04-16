// File API'si eksikse mock'la
if (typeof globalThis.File === "undefined") {
  // @ts-ignore
  globalThis.File = class File extends Blob {
    name: string;
    lastModified: number;
    webkitRelativePath: string = "";
    constructor(chunks: any[], filename: string, opts?: any) {
      super(chunks, opts);
      this.name = filename;
      this.lastModified = (opts && opts.lastModified) || Date.now();
    }
  };
}
