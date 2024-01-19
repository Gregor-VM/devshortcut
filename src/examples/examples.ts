import tags from "../utils/tags";

const customTags = {

}

const examples = [
    {
        title: 'Redux',
        folder: 'redux',
        content: null,
        tags: [tags.react, tags.storeManagament, tags.flutter, tags.typescript, tags.javascript],
        docs: null
    },
    {
        title: 'Sorting',
        folder: 'sorting',
        tabs: ['javascript'],
        github: ['https://github.com/the-road-to-learn-react/react-redux-example'],
        tags: [tags.react, tags.flutter, tags.typescript, tags.javascript]
    },
];

export type Examples = typeof examples;
export type Example = typeof examples[0];

export default examples;