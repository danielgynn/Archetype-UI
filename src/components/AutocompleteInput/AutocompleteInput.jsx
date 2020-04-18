import React, { Component } from "react";
import PropTypes from "prop-types";
import Styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import { Input } from '../..';
import { hexToRgb, space } from "../../utils";

const StyledLabel = Styled.label`
    color: ${ props => props.theme.colors.textSecondary };
    font-weight: 400;
    font-size: .9rem;
    display: inline-block;
    margin-bottom: .5rem;
`;

const SuggestionsWrapper = Styled.div`
    position: relative;
    ${ props => space(props, 2) };

    ${ breakpoint('md')`
        ${ props => space(props, 1) };
    ` }

    ${ breakpoint('xl')`
        ${ props => space(props, 0) };
    ` }
`;

const SuggestionsList = Styled.ul`
    border: 1px solid ${ props => props.theme.colors.accentTwo };
    list-style: none;
    margin-top: 0;
    border-radius: 8px;
    max-height: 215px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    padding-left: 0;
    z-index: 10000;
    background-color: ${ props => props.theme.colors.white };
    position: absolute;
    width: 100%;
    top: ${ props => props.hasLabel ? '80px' : '50px' };
`;

const SuggestionsListItem = Styled.li`
    width: 100%;
    padding: .75rem;
    line-height: normal;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    background-color: ${ props => props.activeItem ? hexToRgb(props.theme.colors.primary, .75) : props.theme.colors.white };
    color: ${ props => props.activeItem ? props.theme.colors.textInverted : props.theme.colors.text };

    &:hover {
        background-color: ${ props => props.theme.colors.primary };
        color: ${ props => props.theme.colors.textInverted };
        cursor: pointer;
        font-weight: 700;
    }
`;

class AutocompleteInput extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false
    };
  }

  onChange = e => {
    const { suggestions, onChange } = this.props;
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true
    });

    if (userInput !== undefined) {
      onChange(userInput);
    }
  };

  onClick = e => {
      const { onChange } = this.props;

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false
    });

    if (e && e.currentTarget.innerText !== undefined) {
      onChange(e.currentTarget.innerText);
    }
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;
    const { onChange } = this.props;

    // User pressed the enter key
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false
      });

      if (filteredSuggestions[activeSuggestion] !== undefined) {
        onChange(filteredSuggestions[activeSuggestion]);
      }
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions
      },
      props: {
          width,
          placeholder,
          required,
          label,
          value,
          disabled,
          mt, mb, mr, ml, margin
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && value) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <SuggestionsList hasLabel={ label }>
            {filteredSuggestions.map((suggestion, index) => {
              return (
                <SuggestionsListItem activeItem={ index === activeSuggestion } key={suggestion} onClick={onClick}>
                  {suggestion}
                </SuggestionsListItem>
              );
            })}
          </SuggestionsList>
        );
      }
    }

    return (
      <SuggestionsWrapper width={ width } mt={ mt } mb={ mb } mr={ mr } ml={ ml } margin={ margin }>
        { (label) && <StyledLabel>{ label } { required && '*' }</StyledLabel> }
        <Input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={ placeholder }
          value={value}
          disabled={ disabled }
        />
        {suggestionsListComponent}
      </SuggestionsWrapper>
    );
  }
}

export default AutocompleteInput;