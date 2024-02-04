export enum TagTypeEnum {
    "language" = "Language",
    "framework" = "Framework",
    "library" = "Library",
    "topic" = "Topic"
}

type TagType = keyof typeof TagTypeEnum;

export const Tag = (name: string, topic: TagType = "library" ) => {

    class Tag{
        name: string;
        type: TagType;
        constructor(name: string, type: TagType){
            this.name = name;
            this.type = type;
        }
    }

    return new Tag(name, topic);
}

const tags = {
    react: Tag("React"),
    javascript: Tag("JavaScript", "language"),
    nodejs: Tag("NodeJS", "language"),
    java: Tag("Java", "language"),
    grahql: Tag("GraphQL", "language"),
    typescript: Tag("TypeScript", "language"),
    go: Tag("Go", "language"),
    express: Tag("Express", "framework"),
    springBoot: Tag("Spring Boot", "framework"),
    nestjs: Tag("NestJS", "framework"),
    angular: Tag("Angular", "framework"),
    storeManagament: Tag("Store Managment", "topic"),
    authentication: Tag("Authentication", "topic"),
    api: Tag("API", "topic"),
}

export type Tag = typeof tags[keyof typeof tags]

export default tags;
