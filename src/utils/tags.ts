export enum TagTypeEnum {
    "language" = "Language",
    "framework" = "Framework",
    "library" = "Library",
    "topic" = "Topic"
}

type TagType = keyof typeof TagTypeEnum;

const Tag = (name: string, topic: TagType = "library" ) => {

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
    redux: Tag("Redux"),
    javascript: Tag("JavaScript", "language"),
    typescript: Tag("TypeScript", "language"),
    dart: Tag("Dart", "language"),
    flutter: Tag("Flutter", "framework"),
    react: Tag("React", "framework"),
    storeManagament: Tag("Store Managment", "topic"),
}

export type Tag = typeof tags[keyof typeof tags]

export default tags;