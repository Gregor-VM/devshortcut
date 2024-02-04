export interface ExampleResponse{
    tabs?: string[]
    structure: ExampleData[]
}

export interface ExampleData {
    item: string
    structure: ExampleData[] | null
    path: string
    modified: boolean
    parent: ExampleData | null
    includeContent: boolean
    itemPath: string
    isDirectory: boolean
    fileContent: string
    downloadUrl: string
}