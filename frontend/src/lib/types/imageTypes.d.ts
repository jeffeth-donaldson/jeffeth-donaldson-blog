export interface imageFormats {
    thumbnail: imageFormat,
    medium: imageFormat,
    small: imageFormat,
    large: imageFormat,
}

export interface imageFormat {
    name: string,
    hash: string,
    ext: string,
    mime: string,
    path: string|null,
    width: number,
    height: number,
    size: number,
    url: string
}

export interface image {
    name: string,
    alternativeText: string,
    url: string,
    caption:string,
    width: number,
    height: number,
    formats: imageFormats,
    hash: string,
    ext: string,
    mime: string,
    size: number,
    previewUrl: string|null,
    provider: string,
    provider_metadata: any|null,
    createdAt: string,
    updatedAt: string
}