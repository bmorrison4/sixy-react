import React, { Component } from 'react';

export default class Messages extends Component {
  constructor(props) {
    super(props);

    this.scrollDown = this.scrollDown.bind(this);
  }

  scrollDown() {
    const { container } = this.refs;
    container.scrollTop = container.scrollHeight;
  }

  componentDidMount() {
    this.scrollDown();
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollDown()
  }

  render() {
    const { messages, user } = this.props;
    return (
      <div className='messages-container'>
        <div className="thread">
          {
            messages.map((mes => {
              return (
                <div key={mes.id}
                className={`message=container ${mes.sender === user.name}`}
                >
                  <p>{mes.sender}</p>
                  <span>{mes.message}</span>
                </div>
              )
            }))
          }
        </div>
      </div>
    )
  }
}