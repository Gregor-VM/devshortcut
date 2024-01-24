import tags from "../utils/tags";
import { GithubExample, LocalExample } from "../utils/utils";

const customTags = {

}

// Note: Each title will be unique

const examples = [
    {
        title: 'Redux Example',
        tabs: [
            LocalExample('react'),
            LocalExample('flutter'),
        ],
        folder: 'redux',
        tags: [tags.react, tags.storeManagament, tags.flutter, tags.typescript, tags.javascript],
    },
    {
        title: 'Sorting',
        tabs: [
            LocalExample('react'),
            GithubExample('JavaScript', 'https://github.com/Gregor-VM/Gregor-VM'),
        ],
        folder: 'redux',
        tags: [tags.react, tags.flutter, tags.typescript, tags.javascript]
    },
    {
        title: 'Fibonacci',
        tabs: [
            GithubExample('JavaScript', 'https://github.com/Gregor-VM/Gregor-VM'),
        ],
        tags: [tags.react, tags.flutter, tags.typescript, tags.javascript]
    },
];

//export type Examples = typeof examples;
export type Example = typeof examples[0];

export default examples;