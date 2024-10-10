/**
 * This function generates a QR code image from a given base64 string using the qrcode-generator
 * library.
 * @param {string} base64 - The `base64` parameter is a string that represents an image in base64
 * format. This function takes the base64 string and generates a QR code image using the
 * `qrcode-generator` library. The resulting QR code image can be used to encode and decode
 * information, such as a URL or text
 * @returns an HTML img tag that displays a QR code generated from the input base64 string.
 */
import qrcode from "qrcode-generator";

export const GetQrCode = (base64: string) => {
  const code = qrcode(0, "Q");
  code.addData(base64);
  code.make();
  return code.createImgTag(3, 0);
};
