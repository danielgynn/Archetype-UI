export const position = (props) => `
    ${ props.position && `position: ${ props.position }` };
    ${ props.position && props.posTop && `top: ${ props.posTop }` };
    ${ props.position && props.posRight && `right: ${ props.posRight }` };
    ${ props.position && props.posBottom && `bottom: ${ props.posBottom }` };
    ${ props.position && props.posLeft && `left: ${ props.posLeft }` };
`;