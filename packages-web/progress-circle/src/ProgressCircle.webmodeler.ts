import { Component, createElement } from "react";
import { ProgressCircle, ProgressCircleProps } from "./components/ProgressCircle";
import ProgressCircleContainer, { ContainerProps } from "./components/ProgressCircleContainer";

declare function require(name: string): string;

type VisibilityMap = {
    [P in keyof ContainerProps]: boolean;
};

// tslint:disable-next-line:class-name
export class preview extends Component<ContainerProps, {}> {
    render() {
        return createElement(ProgressCircle, this.transformProps(this.props));
    }

    private transformProps(props: ContainerProps): ProgressCircleProps {
        return {
            alertMessage: ProgressCircleContainer.validateProps(props),
            circleThickness: props.circleThickness,
            className: props.class,
            clickable: false,
            displayText: props.displayText,
            maximumValue: 200,
            positiveValueColor: props.positiveValueColor,
            style: ProgressCircleContainer.parseStyle(props.style),
            textSize: props.textSize,
            value: 134
        };
    }
}

export function getPreviewCss() {
    return require("./ui/ProgressCircle.scss");
}

export function getVisibleProperties(valueMap: ContainerProps, visibilityMap: VisibilityMap) {
    if (valueMap.onClickEvent === "doNothing") {
        visibilityMap.microflow = false;
        visibilityMap.page = false;
    } else if (valueMap.onClickEvent === "showPage") {
        visibilityMap.page = true;
        visibilityMap.microflow = false;
    } else if (valueMap.onClickEvent === "callMicroflow") {
        visibilityMap.page = false;
        visibilityMap.microflow = true;
    }

    return visibilityMap;
}