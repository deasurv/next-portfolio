const BLOCK_TAGS = {
    blockquote: 'block-quote',
    p: 'paragraph',
    ul: 'bulleted-list',
    li: 'list-item',
    ol: 'numbered-list',
    h1: 'heading-one',
    h2: 'heading-two'
};

const MARK_TAGS = {
    em: 'italic',
    strong: 'bold',
    u: 'underlined',
    code: 'code'
};

export const rules = [
    {
        deserialize(el, next) {
            const type = BLOCK_TAGS[el.tagName.toLowerCase()];
            if (type) {
                return {
                    object: 'block',
                    type: type,
                    nodes: next(el.childNodes),
                };
            }
        },
        serialize(obj, children) {
            if (obj.object == 'block') {
                switch (obj.type) {
                    case 'paragraph':
                        return <p>{children}</p>;
                        break;
                    case 'block-quote':
                        return <blockquote>{children}</blockquote>;
                        break;
                    case 'bulleted-list':
                        return <ul>{children}</ul>;
                        break;
                    case 'heading-one':
                        return <h1>{children}</h1>;
                        break;
                    case 'heading-two':
                        return <h2>{children}</h2>;
                        break;
                    case 'list-item':
                        return <li>{children}</li>;
                        break;
                    case 'numbered-list':
                        return <ol>{children}</ol>;
                        break;
                }
            }
        },
    },
    // Add a new rule that handles marks...
    {
        deserialize(el, next) {
            const type = MARK_TAGS[el.tagName.toLowerCase()];
            if (type) {
                return {
                    object: 'mark',
                    type: type,
                    nodes: next(el.childNodes),
                }
            }
        },
        serialize(obj, children) {
            if (obj.object == 'mark') {
                switch (obj.type) {
                    case 'bold':
                        return <strong>{children}</strong>;
                        break;
                    case 'italic':
                        return <em>{children}</em>;
                        break;
                    case 'underlined':
                        return <u>{children}</u>;
                        break;
                    case 'code':
                        return <code>{children}</code>;
                        break;
                }
            }
        },
    },
];