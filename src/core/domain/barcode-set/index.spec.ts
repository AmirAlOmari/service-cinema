import { containsBarcodeSet } from '.';

describe('@core/domain/barcode-set', () => {
  describe('containsBarcodeSet', () => {
    describe('when the 1st barcodeSet is fully contained in the 2nd barcodeSet', () => {
      it('should return true', () => {
        // Given
        const barcodeSet1 = ['123', 'abc'];
        const barcodeSet2 = ['xyz', 'abc', '987', '123'];

        // Then
        expect(containsBarcodeSet(barcodeSet1, barcodeSet2)).toBe(true);
      });
    });

    describe('when the 1st barcodeSet is not fully contained in the 2nd barcodeSet', () => {
      it('should return false', () => {
        // Given
        const barcodeSet1 = ['123', 'abc'];
        const barcodeSet2 = ['xyz', '987', '123'];

        // Then
        expect(containsBarcodeSet(barcodeSet1, barcodeSet2)).toBe(false);
      });
    });

    describe('when the 2nd barcodeSet is fully contained in the 1st barcodeSet', () => {
      it('should return false', () => {
        // Given
        const barcodeSet1 = ['xyz', 'abc', '987', '123'];
        const barcodeSet2 = ['123', 'abc'];

        // Then
        expect(containsBarcodeSet(barcodeSet1, barcodeSet2)).toBe(false);
      });
    });
  });
});
