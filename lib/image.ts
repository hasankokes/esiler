// Trendyol CDN'deki orijinal fotoğraflar ~1 MB; mnresize ile küçültülmüş hali istenir.
// Trendyol dışındaki URL'ler olduğu gibi döner.
export function sizedImage(url: string | undefined, width: number, height: number) {
    if (!url) return url;
    const prefix = "https://cdn.dsmcdn.com/";
    if (!url.startsWith(prefix) || url.startsWith(prefix + "mnresize/")) return url;
    return `${prefix}mnresize/${width}/${height}/${url.slice(prefix.length)}`;
}
