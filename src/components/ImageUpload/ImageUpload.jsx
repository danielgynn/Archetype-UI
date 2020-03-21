import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import styled from 'styled-components';
import FileDrop from 'react-file-drop';

import { Icon, Box, Text, Button } from '../..';
import { hexToRgb } from '../../utils';

const Wrapper = styled(Box)`
    margin: 1rem auto;
`;

const StyledLabel = styled.label`
    color: ${ props => props.theme.colors.textSecondary };
    font-weight: 400;
    font-size: .9rem;
    display: inline-block;
    margin-bottom: .5rem;
`;

const FileContainer = styled(FileDrop)`
    background: ${ props => props.drag ? props.theme.colors.accentTwo : hexToRgb(props.theme.colors.white, 1) };
    border: 1px solid ${ props => props.drag ? props.theme.colors.primary : props.theme.colors.accentTwo };
	position: relative;
	border-radius: 8px;
	padding: 20px 0;
    transition: all 0.3s ease-in;
    
    > div {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
`;

const PreviewWrapper = styled.div`
    display: flex;
	flex-wrap: wrap;
	justify-content: center;
	width: 100%;
`;

const PictureContainer = styled.div`
    width: 16%;
	margin: 1rem;
	padding: 4px;
	background: ${ props => props.theme.colors.white };
	display: flex;
	align-items: center;
	justify-content: center;
	height: inherit;
	box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.1);
	position: relative;
`;

const StyledFlipMove = styled(FlipMove)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
`;

const Picture = styled.img`
    width: 100%;
`;

const DeletePicture = styled.div`
    position: absolute;
	top: -8px;
	right: -8px;
	color: #fff;
	background: ${ props => props.theme.colors.error };
	border-radius: 50%;
	text-align: center;
	cursor: pointer;
	font-size: 14px;
	font-weight: bold;
	line-height: 20px;
	width: 20px;
	height: 20px;
`;

const ErrorContainer = styled.div`
    max-width: 300px;
    font-size: 12px;
    margin: 1rem 0;
	color: ${ props => props.theme.colors.error };
	text-align: left;
`;

const FileInput = styled.input`
    opacity: 0;
	position: absolute;
	z-index: -1;
`;

const ERROR = {
    NOT_SUPPORTED_EXTENSION: 'NOT_SUPPORTED_EXTENSION',
    FILESIZE_TOO_LARGE: 'FILESIZE_TOO_LARGE'
};

class ImageUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pictures: [...props.defaultImages],
            files: [],
            fileErrors: [],
            drag: false
        };

        this.inputElement = '';

        this.handleDrop = this.handleDrop.bind(this);
        this.onDropFile = this.onDropFile.bind(this);
        this.onUploadClick = this.onUploadClick.bind(this);
        this.triggerFileUpload = this.triggerFileUpload.bind(this);
    }

    componentDidUpdate(_prevProps, prevState, _snapshot) {
        const { files, pictures } = this.state;
        const { onChange } = this.props;
    
        if (prevState.files !== files) {
            onChange(files, pictures);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { defaultImages } = this.props;
    
        if (nextProps.defaultImages !== defaultImages) {
            this.setState({
                pictures: nextProps.defaultImages
            });
        }
    }

    hasExtension(fileName) {
        const pattern = '(' + this.props.imgExtension.join('|').replace(/\./g, '\\.') + ')$';

        return new RegExp(pattern, 'i').test(fileName);
    }

    handleDrop(files, e) {
        this.setState({
            drag: false
        });

        this.onDropFile(e, files);
    }

    onDropFile(e, fullFiles) {
        const { maxFileSize, singleImage } = this.props;
        const { pictures, files } = this.state;
    
        const droppedFiles = fullFiles ? [...fullFiles] : e.target.files;
        const allFilePromises = [];
        const fileErrors = [];

        const total = singleImage ? 1 : droppedFiles.length;

        for (let i = 0; i < total; i++) {
            let file = droppedFiles[i];
            let fileError = {
                name: file.name,
            };

            if (!this.hasExtension(file.name)) {
                fileError = Object.assign(fileError, {
                    type: ERROR.NOT_SUPPORTED_EXTENSION
                });

                fileErrors.push(fileError);

                continue;
            }

            if (file.size > maxFileSize) {
                fileError = Object.assign(fileError, {
                    type: ERROR.FILESIZE_TOO_LARGE
                });

                fileErrors.push(fileError);

                continue;
            }

            allFilePromises.push(this.readFile(file));
        }

        this.setState({
            fileErrors
        });

        Promise.all(allFilePromises).then(newFilesData => {
            const dataURLs = singleImage?[]:pictures.slice();
            const updatedFiles = singleImage?[]:files.slice();

            newFilesData.forEach(newFileData => {
                dataURLs.push(newFileData.dataURL);
                updatedFiles.push(newFileData.file);
            });

            this.setState({
                pictures: dataURLs,
                files: updatedFiles
            });
        });
  }

    onUploadClick(e) {
        if (e) {
            e.target.value = null;
        }
    }

    readFile(file) {
        return new Promise((resolve, _reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                let dataURL = e.target.result;
                dataURL = dataURL.replace(";base64", `;name=${file.name};base64`);

                resolve({file, dataURL});
            };

            reader.readAsDataURL(file);
        });
    }

    removeImage(picture) {
        const { onChange } = this.props;
        const { pictures, files } = this.state;
        
        const removeIndex = pictures.findIndex(e => e === picture);
        const filteredPictures = pictures.filter((e, index) => index !== removeIndex);
        const filteredFiles = files.filter((e, index) => index !== removeIndex);

        this.setState({
            pictures: filteredPictures,
            files: filteredFiles
        }, () => {
            onChange(files, pictures);
        });
    }

    renderErrors() {
        const { fileErrors } = this.state;
        const { fileSizeError, fileTypeError } = this.props;

        return fileErrors.map((fileError, index) => {
            return (
                <ErrorContainer key={ index }>
                    * {fileError.name} {fileError.type === ERROR.FILESIZE_TOO_LARGE ? fileSizeError: fileTypeError}
                </ErrorContainer>
            );
        });
    }

    renderIcon() {
        const { withIcon } = this.props;

        if (withIcon) {
            return <Icon size={ '2x' } color={ 'text' } icon={ 'upload' } />;
        }
    }

    renderLabel() {
        const { withLabel, help } = this.props;
    
        if (withLabel) {
            return <Text color={ 'textSecondary' } small>{ help }</Text>
        }
    }

    renderPreview() {
        return (
            <PreviewWrapper>
                <StyledFlipMove enterAnimation="fade" leaveAnimation="fade">
                    { this.renderPreviewPictures() }
                </StyledFlipMove>
            </PreviewWrapper>
        );
    }

    renderPreviewPictures() {
        const { pictures } = this.state;

        return pictures.map((picture, index) => {
            return (
                <PictureContainer key={ index }>
                    <DeletePicture onClick={ () => this.removeImage(picture) }>X</DeletePicture>
                    <Picture src={ picture } alt="preview" />
                </PictureContainer>
            );
        });
    }

    triggerFileUpload() {
        this.inputElement.click();
    }

    clearPictures() {
        this.setState({
            pictures: []
        });
    }

    render() {
        const { id, withPreview, buttonType, buttonText, name, singleImage, accept, label } = this.props;
        const { drag } = this.state;

        return (
            <Wrapper>
                { (label) && <StyledLabel htmlFor={ id }>{ label }</StyledLabel> }
                <FileContainer
                    drag={ drag }
                    id={ id }
                    onDrop={ this.handleDrop }
                    onDragOver={ () => this.setState({drag: true}) }
                    onDragLeave={ () => this.setState({drag: false}) }
                >
                    { this.renderIcon() }
                    { this.renderLabel() }
                    { this.renderErrors() }
                    <Button
                        margin={ [1,0,0,0] }
                        type={ buttonType }
                        onClick={ this.triggerFileUpload }
                        text={ buttonText }
                    />
                    <FileInput
                        type="file"
                        ref={ input => this.inputElement = input }
                        name={ name }
                        multiple={ !singleImage }
                        onChange={ this.onDropFile }
                        onClick={ this.onUploadClick }
                        accept={ accept }
                    />
                    { withPreview && this.renderPreview() }
                </FileContainer>
            </Wrapper>
        )
    }
}

ImageUpload.defaultProps = {
    id: 'image-upload',
    withPreview: true,
    accept: "image/*",
    name: "",
    withIcon: true,
    buttonText: "Choose Images",
    buttonType: "button",
    withLabel: true,
    help: "Max file size: 5mb, accepted: jpg|gif|png|svg",
    imgExtension: ['.jpg', '.jpeg', '.gif', '.png'],
    maxFileSize: 5242880,
    fileSizeError: " file size is too big",
    fileTypeError: " is not a supported file extension",
    singleImage: false,
    onChange: () => {},
    defaultImages: []
};

ImageUpload.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    onDelete: PropTypes.func,
    buttonType: PropTypes.string,
    withPreview: PropTypes.bool,
    accept: PropTypes.string,
    name: PropTypes.string,
    withIcon: PropTypes.bool,
    buttonText: PropTypes.string,
    withLabel: PropTypes.bool,
    help: PropTypes.string,
    imgExtension: PropTypes.array,
    maxFileSize: PropTypes.number,
    fileSizeError: PropTypes.string,
    fileTypeError: PropTypes.string,
    singleImage: PropTypes.bool,
    defaultImages: PropTypes.array
};

export default ImageUpload;