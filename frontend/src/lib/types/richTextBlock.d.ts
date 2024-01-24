export interface richTextBlock {
    type:"image" | "link" | "paragraph" | "quote" | "heading" | "list" | "text" | "list-item" | "code",
    children:richTextBlock[]
}
export interface paragraphBlock extends richTextBlock {
    type:"paragraph",
}
export interface textBlock extends richTextBlock {
    type:'text',
    text:string,
    bold?:boolean,
    italic?:boolean,
    underline?:boolean,
    strikethrough?:boolean
    code?:boolean
}
export interface imageBlock extends richTextBlock {
    type:'image',
    image: {
        name: string,
        alternativeText: string,
        url: string,
        caption:string,
        width: number,
        height: number,
        formats: any[],
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
}
export interface headingBlock extends richTextBlock {
    type:'heading',
    level: number
}
export interface listBlock extends richTextBlock {
    type:'list',
    format:'ordered'|'unordered'
}
export interface linkBlock extends richTextBlock {
    type:'link',
    url:string
}