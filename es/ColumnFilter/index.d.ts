import React from 'react';
interface IComponentProps {
    data: IItem[];
    onChange: (list: IItem[], value: string[]) => void;
    columnKey?: string;
}
interface IItem {
    dataIndex: string;
    key?: string;
    value?: string;
    unfilter?: boolean;
    hide?: boolean;
    [propName: string]: any;
}
export default class CustomColumn extends React.Component<IComponentProps, any> {
    KEY: any;
    constructor(props: IComponentProps);
    static getDerivedStateFromProps(nextProps: IComponentProps, prevState: any): {
        value: string[];
        hideValue: any;
        columnKey: string;
    };
    componentDidMount: () => void;
    initColumns: () => void;
    setStorage: (values: string[]) => void;
    handleChange: (value: any[]) => void;
    dropDownContent: () => JSX.Element;
    checkHasFilter: () => boolean;
    render(): JSX.Element;
}
export {};
