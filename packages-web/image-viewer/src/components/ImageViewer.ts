import { Component, DOM, createElement } from "react";

import * as classNames from "classnames";
import * as Lightbox from "react-image-lightbox";
import { Units, onClickOptions } from "./ImageViewerContainer";

import "../ui/ImageViewer.css";

interface ImageViewerProps {
    imageUrl: string;
    height: number;
    heightUnit: Units;
    width: number;
    widthUnit: Units;
    className?: string;
    style?: object;
    responsive: boolean;
    onClickOption?: onClickOptions;
    getRef?: (node: HTMLElement) => void;
    onClick?: () => void;
}

interface ImageViewerState {
    isOpen: boolean;
}

class ImageViewer extends Component<ImageViewerProps, ImageViewerState> {

    constructor(props: ImageViewerProps) {
        super(props);

        this.state = {
            isOpen: false
        };
        this.toggleLightBox = this.toggleLightBox.bind(this);
    }

    render() {
        return DOM.div(
            {
                className: classNames(
                    "widget-image-viewer",
                    { "widget-image-viewer-responsive": this.props.responsive },
                    this.props.className,
                    { hidden: !this.props.imageUrl }
                ),
                ref: this.props.getRef
            },
            DOM.img({
                onClick: this.props.onClickOption === "openFullScreen" ? this.toggleLightBox : this.props.onClick,
                src: this.props.imageUrl,
                style: {
                    ...this.props.style,
                    height: this.getStyle(this.props.height, this.props.heightUnit),
                    width: this.getStyle(this.props.width, this.props.widthUnit)
                }
            }),
            this.state.isOpen && createElement(Lightbox, {
                mainSrc: this.props.imageUrl,
                onCloseRequest: this.toggleLightBox
            })
        );
    }

    private toggleLightBox() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    private getStyle(value: string | number, type: string): number | string {
        if (type === "pixels") {
            return value;
        }
        if (type === "percentage") {
            return value + "%";
        }

        return "";
    }
}

export { ImageViewer, ImageViewerProps, ImageViewerState };