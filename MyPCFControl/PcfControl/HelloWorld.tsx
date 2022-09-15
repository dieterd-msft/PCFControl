import * as React from 'react';

export interface IProps {
  hitems: number;
  vitems: number;
  x: number;
  y: number;
  horizontal: number;
  vertical: number;
  onChange: (x: number, y: number, h: number, v: number) => void;
}

export interface IState {
  x: number;
  y: number;
  horizontal: number;
  vertical: number;
}

export class HelloWorld extends React.Component<IProps, IState> {
  constructor(props: Readonly<IProps>) {
    super(props);
    this.state = { x: props.x, y: props.y, horizontal: props.horizontal, vertical: props.vertical };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event: React.MouseEvent) {
    //const svg = select(elementRef.current).selectAll('svg');
    let rect = event.currentTarget.getBoundingClientRect();
    let x = event.pageX - rect.left;
    let y = event.pageY - rect.top;

    let hitemsize = rect.width / this.props.hitems;
    let vitemsize = rect.height / this.props.vitems;

    console.log("Hitems: ",this.props.hitems);
    console.log("Vitems: ",this.props.vitems);
    console.log("Hitemsize: ",hitemsize);
    console.log("Hitemsize: ",vitemsize);

    let h = Math.round(x/hitemsize) + 1;
    let v = 45 - Math.round(y/vitemsize);

    this.setState({ x: x, y: y, horizontal: h, vertical: v });
    this.props.onChange(x, y, h, v);
  }
  public render(): React.ReactNode {
    return (
      <div onClick={this.handleClick} style={{ height: '100vh', width: '100vh' }}>
        <svg>
        <circle cy="75" cx="50" r="5" fill="red"></circle>
        </svg>
      </div>
    )
  }
}

