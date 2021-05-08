import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromHTML, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import Styled from 'styled-components';
import PropTypes from 'prop-types';
import 'draft-js/dist/Draft.css';

import { Box, Button, Flexbox } from '../..';
import { space } from '../../utils';

const EditorBox = Styled(Box)`
    ${ props => space(props) };
`;

const StyledLabel = Styled.label`
    color: ${ props => props.theme.colors.textSecondary };
    font-weight: 400;
    font-size: .9rem;
    display: inline-block;
    margin-bottom: .5rem;
`;

const EditorWrapper = Styled.div`
    ${ props => space(props) };
    background: #fff;
    border: 1px solid ${ props => props.theme.colors.accentTwo };
    border-radius: 8px;
    font-size: 14px;
    padding: 15px;
    min-height: 200px;
`;

const EditorContainer = Styled.div`
    border-top: 1px solid ${ props => props.theme.colors.accentTwo };
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
    color: ${ props => props.active ? props.theme.colors.primary : props.theme.colors.textSecondary };
    cursor: pointer;
    margin-right: 16px;
    font-weight: ${ props => props.active ? 700 : 400 };
    padding: 2px 0;
    display: inline-block;
`;

const FileInput = Styled.input`
    opacity: 0;
	position: absolute;
	z-index: -1;
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
    {label: 'Code Block', style: 'code-block'}
];

const BlockStyleControls = (props) => {
    const { editorState } = props;
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
    SUBSCRIPT: { fontSize: '0.6em', verticalAlign: 'sub' },
    SUPERSCRIPT: { fontSize: '0.6em', verticalAlign: 'super' }
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
    {label: 'Subscript', style: 'SUBSCRIPT'},
    {label: 'Superscript', style: 'SUPERSCRIPT'}
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
        const state = (props.content && blocksFromHTML && blocksFromHTML.contentBlocks !== null) ? ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap,
        ) : null;
        
        this.state = {
            editorState: (props.content && state) ? EditorState.createWithContent(state) : EditorState.createEmpty()
        };

        this.inputElement = '';
    
        this.focus = () => this.editor.focus();
        this.onChange = (editorState) => this.updateEditorState(editorState);
    
        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.onTab = (e) => this._onTab(e);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
        this.triggerFileUpload = this.triggerFileUpload.bind(this);
        this.onDropFile = this.onDropFile.bind(this);
        this.onUploadClick = this.onUploadClick.bind(this);
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

    triggerFileUpload() {
        this.inputElement.click();
    }

    onUploadClick(e) {
        if (e) {
            e.target.value = null;
        }
    }

    onDropFile(e, fullFiles) {
        const { onImageUpload } = this.props;

        const droppedFiles = fullFiles ? [...fullFiles] : [...e.target.files];

        if (onImageUpload && droppedFiles && droppedFiles.length) {
            onImageUpload(droppedFiles);
        }
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
        const { label, placeholder, required, allowImages, ...rest } = this.props;
    
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
            <EditorBox { ...rest }>
                { (label) && <StyledLabel>{ label } { required && '*' }</StyledLabel> }
                <EditorWrapper>
                    <Flexbox
                        alignItems={ 'center' }
                        justifyContent={ 'space-between' }
                    >
                        <BlockStyleControls
                            editorState={ editorState }
                            onToggle={ this.toggleBlockType }
                        />
                        { allowImages && (
                            <Box>
                                <Button
                                    margin={ [0,0,0,0] }
                                    type={ 'button' }
                                    onClick={ this.triggerFileUpload }
                                    text={ 'Add Image' }
                                />
                                <FileInput
                                    type="file"
                                    ref={ input => this.inputElement = input }
                                    name={ 'Add Image' }
                                    multiple={ true }
                                    onChange={ this.onDropFile }
                                    onClick={ this.onUploadClick }
                                    accept={ 'image/*' }
                                />
                            </Box>
                        ) }
                    </Flexbox>
                        
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
            </EditorBox>
        );
    }
}

RichTextInput.defaultProps = {
    placeholder: 'Enter some text...',
    required: false
};

RichTextInput.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool
};