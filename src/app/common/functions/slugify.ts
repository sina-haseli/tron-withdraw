export function convertToSlug(Text: string): string {
  return Text.toLowerCase()
    .trimStart()
    .trimEnd()
    .replace(/^\s+|\s+$\s/g, '')
    .replace(/[^a-z0-9_\s-ءاأإآؤئبتثجحخدذرزسشصضطظعغفقكلمنهويةى]#u/, '')
    .replace(/[*+~.()'"!:@]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace('*', '-');
}
