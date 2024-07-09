// Build Src
export function buildSrcSet(name: string, sizes: number[], paths: string[] = [], format: string = 'webp'): string {
    const path = paths.length > 0 ? '/' + paths.join('/') : '';
    return sizes.map(size => `${path}/${name}-${size}.${format} ${size}w`).join(', ');
}

export function buildSizes(sizes: number[]): string {
    return sizes.map(size => `(max-width: ${size}px) ${size}px`).join(', ') + ', 100vw';
}