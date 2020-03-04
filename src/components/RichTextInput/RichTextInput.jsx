import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromHTML, createFromBlockArray, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import Styled from 'styled-components';
import PropTypes from 'prop-types';
import 'draft-js/dist/Draft.css';

import { Box } from '../..';

const StyledLabel = Styled.label`
    color: ${ props => props.theme.colours.textSecondary };
    font-weight: 400;
    font-size: .9rem;
    display: inline-block;
    margin-bottom: .5rem;
`;

const EditorWrapper = Styled.div`
    background: #fff;
    border: 1px solid ${ props => props.theme.colours.accentTwo };
    border-radius: 8px;
    font-size: 14px;
    padding: 15px;
`;

const EditorContainer = Styled.div`
    border-top: 1px solid ${ props => props.theme.colours.accentTwo };
    cursor: text;
    font-size: 16px;
    margin-top: 10px;
    padding: 1rem 0 0;
`;

const EditorControls = Styled.div`
    font-size: 14px;
    margin-bottom: 5px;
    user-select: none;
`;

const EditorButton = Styled.span`
    color: ${ props => props.active ? props.theme.colours.primary : props.theme.colours.textSecondary };
    cursor: pointer;
    margin-right: 16px;
    font-weight: ${ props => props.active ? 700 : 400 };
    padding: 2px 0;
    display: inline-block;
`;

class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        return (
            <EditorButton active={ this.props.active } onMouseDown={this.onToggle}>
                {this.props.label}
            </EditorButton>
        );
    }
}

const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
  
    return (
        <EditorControls>
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </EditorControls>
    );
};

      // Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};
  
function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
}
  
const INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'},
];
  
const InlineStyleControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <EditorControls>
            {INLINE_STYLES.map(type =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </EditorControls>
    );
};

export default class RichTextInput extends Component {
    constructor(props) {
        super(props);


        const blocksFromHTML = (props.content) ? convertFromHTML(props.content) : null;
        const state = (props.content) ? ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap,
        ) : null;
        
        this.state = {
            editorState: (props.content) ? EditorState.createWithContent(state) : EditorState.createEmpty()
        };
    
        this.focus = () => this.editor.focus();
        this.onChange = (editorState) => this.updateEditorState(editorState);
    
        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.onTab = (e) => this._onTab(e);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    }

    _handleKeyCommand(command) {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            this.onChange(newState);
            return true;
        }

        return false;
    }
    
    _onTab(e) {
        const maxDepth = 4;
        this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    }
    
    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }
    
    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    updateEditorState(editorState) {
        const { onChange } = this.props;

        const rawDraftContentState = convertToRaw(editorState.getCurrentContent());
        const html = draftToHtml(rawDraftContentState);    

        this.setState({editorState});
        onChange(html);
    }
    
    render() {
        const { editorState } = this.state;
        const { label, placeholder } = this.props;
    
        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();

        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }

        return (
            <Box>
                { (label) && <StyledLabel>{ label }</StyledLabel> }
                <EditorWrapper>
                    <BlockStyleControls
                        editorState={editorState}
                        onToggle={this.toggleBlockType}
                    />
                    <InlineStyleControls
                        editorState={editorState}
                        onToggle={this.toggleInlineStyle}
                    />
                    <EditorContainer onClick={this.focus}>
                        <Editor
                            blockStyleFn={getBlockStyle}
                            customStyleMap={styleMap}
                            editorState={editorState}
                            handleKeyCommand={this.handleKeyCommand}
                            onChange={this.onChange}
                            onTab={this.onTab}
                            placeholder={ placeholder }
                            ref={(input) => { this.editor = input; }} 
                            spellCheck={true}
                        />
                    </EditorContainer>
                </EditorWrapper>
            </Box>
        );
    }
}

RichTextInput.defaultProps = {
    placeholder: 'Enter some text...'
};

RichTextInput.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string
};