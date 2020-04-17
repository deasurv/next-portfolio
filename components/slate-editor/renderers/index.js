import { Button, Icon } from '../components';

function onClickMark(event, type, editor) {
    event.preventDefault();
    editor.toggleMark(type);
}

export const renderMarkButton = (type, icon, editor) => {
    const { value } = editor;
    const isActive = value.activeMarks.some(mark => mark.type == type);

    return (
        <Button reversed active={isActive} onMouseDown={event => onClickMark(event, type, editor)}>
            <Icon>{icon}</Icon>
        </Button>
    );
}

export const renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
        case 'bold':
            return <strong {...attributes}>{children}</strong>;
            break;
        case 'code':
            return <code {...attributes}>{children}</code>;
            break;
        case 'italic':
            return <em {...attributes}>{children}</em>;
            break;
        case 'underlined':
            return <u {...attributes}>{children}</u>;
            break;
        default:
            return next();
            break;
    }
};
