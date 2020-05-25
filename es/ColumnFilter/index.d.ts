import { Component } from 'react';
export default class CustomColumn extends Component {
    static propTypes: {
        data: any;
        onChange: any;
        width: any;
        contentWidth: any;
        columnKey: any;
    };
    constructor(props: any);
    static getDerivedStateFromProps(nextProps: any, prevState: any): {
        value: any[];
        hideValue: any;
        columnKey: any;
    };
    componentDidMount: () => void;
    initColumns: () => void;
    setStorage: (values: any) => void;
    handleChange: (value: any) => void;
    dropDownContent: () => JSX.Element;
    checkHasFilter: () => boolean;
    render(): JSX.Element;
}
