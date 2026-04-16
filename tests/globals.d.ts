// Node ortamında File API'sini tanımlamak için global deklarasyon
// Eğer undici yüklü ise, onun tipini kullan
// Yoksa basit bir tanım bırak

declare global {
  var File: typeof import('undici').File;
  // Alternatif olarak aşağıdaki gibi de kullanılabilir:
  // var File: { new (chunks: any[], filename: string, opts?: any): any };
}
export {};

