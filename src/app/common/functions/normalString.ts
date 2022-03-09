const persianNumbers = [
  /۰/g,
  /۱/g,
  /۲/g,
  /۳/g,
  /۴/g,
  /۵/g,
  /۶/g,
  /۷/g,
  /۸/g,
  /۹/g,
];
const arabicNumbers = [
  /٠/g,
  /١/g,
  /٢/g,
  /٣/g,
  /٤/g,
  /٥/g,
  /٦/g,
  /٧/g,
  /٨/g,
  /٩/g,
];

const persianChar = ['ک', 'د', 'ب', 'ز', 'ذ', 'ش', 'س', 'ی', 'ی'];

const arabicChar = ['ك', 'دِ', 'بِ', 'زِ', 'ذِ', 'شِ', 'سِ', 'ى', 'ي'];

export function normalizeString(Text: string): string {
  for (let i = 0; i < 10; i++) {
    Text = Text.replace(persianNumbers[i], String(i)).replace(
      arabicNumbers[i],
      String(i),
    );
  }

  for (let i = 0; i < 9; i++) {
    Text = Text.replace(arabicChar[i], persianChar[i]);
  }
  return Text.toLowerCase()
    .trimStart()
    .trimEnd()
    .replace(/^\s+|\s+$\s/g, '')
    .replace(/[^a-z0-9_\s-ءاأإآؤئبتثجحخدذرزسشصضطظعغفقكلمنهويةى]#u/, '')
    .replace(/[+~.()'"!:@]/g, '')
    .replace('  ', ' ')
    .replace(/\s\s+/g, ' ');
}
