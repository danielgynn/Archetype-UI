import Box from './Box/Box.jsx';
import Button from './Button/Button.jsx';
import Dropdown from './Dropdown/Dropdown.jsx';
import Flexbox from './Flexbox/Flexbox.jsx';
import GridBox from './GridBox/GridBox.jsx';
import Header from './Header/Header.jsx';
import Icon from './Icon/Icon.jsx';
import Image from './Image/Image.jsx';
import Input from './Input/Input.jsx';
import Jumbo from './Jumbo/Jumbo.jsx';
import Label from './Label/Label.jsx';
import PageHeader from './PageHeader/PageHeader.jsx';
import Table from './Table/Table.jsx';
import Text from './Text/Text.jsx';
import TextLink from './TextLink/TextLink.jsx';
import Toast from './Toast/Toast.jsx';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

export {
    Box, Button, Dropdown, Flexbox, GridBox, Header, Jumbo, Icon, Image, Input, Label, PageHeader, Table, Text, TextLink, Toast
};