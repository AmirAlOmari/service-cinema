export type Barcode = string;

export type BarcodeSet = Barcode[];

/**
 * Whether the barcodeSet1 is fully contained in the barcodeSet2
 */
export const containsBarcodeSet = (barcodeSet1: BarcodeSet, barcodeSet2: BarcodeSet): boolean => {
  return barcodeSet1.every((barcode) => barcodeSet2.includes(barcode));
};
