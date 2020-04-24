import React, { Component, Fragment } from 'react';
import { Editor } from 'slate-react';

import { initialValue } from './initialValue';

import { renderMark, renderNode } from './renderers';
import HoverMenu from './HoverMenu';
import ControlMenu from './ControlMenu';

class SlateEditor extends Component{
    
    state = {
        value: initialValue,
        isLoaded: false
    }

    componentDidMount(){
        this.setState({ isLoaded: true });
        this.updateMenu();
    }

    componentDidUpdate(){
        this.updateMenu();
    }

    onChange = ({ value }) => {
        this.setState({ value });
    }

    updateMenu = () => {
        const menu = this.menu;
        if (!menu) return;

        const { value } = this.state;
        const { fragment, selection } = value;

        if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
            menu.removeAttribute('style')
            return;
        }

        const native = window.getSelection();
        const range = native.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        menu.style.opacity = 1;
        menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`;

        menu.style.left = `${rect.left + window.pageXOffset - menu.offsetWidth / 2 + rect.width / 2}px`;
    }

    getTitle(){
        const { value } = this.state,
            firstBlock = value.document.getBlocks().get(0),
            secondBlock = value.document.getBlocks().get(1);

        const title = firstBlock && firstBlock.text ? firstBlock.text : 'No title';
        const subtitle = secondBlock && secondBlock.text ? secondBlock.text : 'No subtitle';

        return { title, subtitle };
    }

    save = () => {
        const { save } = this.props;
        const headingValues = this.getTitle();

        save(headingValues);
    }

    render(){
        const { value, isLoaded } = this.state;
        return(
            <Fragment>
                { isLoaded &&
                    <Editor
                        placeholder="Enter some text..."
                        value={value}
                        onChange={this.onChange}
                        renderMark={renderMark}
                        renderNode={renderNode}
                        renderEditor={this.renderEditor}
                        {...this.props}
                    />
                }
            </Fragment>
        );
    }

    renderEditor = (props, editor, next) => {
        const children = next();
        const { isSaving } = props;
        
        return (
            <Fragment>
                <ControlMenu save={this.save} isSaving={isSaving}></ControlMenu>
                {children}
                <HoverMenu innerRef={menu => this.menu = menu} editor={editor} />
            </Fragment>
        )
    }
}

export default SlateEditor;