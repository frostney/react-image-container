import React, { Component, PropTypes } from 'react';

class ImageContainer extends Component {
  static propTypes = {
    source: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    component: PropTypes.node,
    componentError: PropTypes.node,
    componentPreload: PropTypes.node,
  }

  static defaultProps = {
    source: '',
    width: -1,
    height: -1,
    component: null,
    componentError: null,
    componentPreload: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isErrored: false,
      imageWidth: props.width,
      imageHeight: props.height,
    };
  }

  componentDidMount() {
    const image = new Image();

    image.onload = () => {
      this.setState({
        isLoading: false,
        isErrored: false,
        imageWidth: (this.props.width < 0) ? image.width : this.props.width,
        imageHeight: (this.props.height < 0) ? image.height : this.props.height,
      });
    };

    image.onerror = () => {
      this.setState({
        isLoading: false,
        isErrored: false,
      });
    };
  }

  render() {
    if (!this.props.source) {
      return null;
    }

    if (this.state.isLoading) {
      return this.props.componentPreload;
    }

    if (this.state.isErrored) {
      return this.props.componentError;
    }

    return React.createElement(this.props.component, {
      width: this.state.imageWidth,
      height: this.state.imageHeight,
    });
  }
}

export default ImageContainer;
