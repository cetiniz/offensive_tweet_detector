import React, { Component } from 'react';
import axios from 'axios';

const buttonStyle = {
  nFire: {
    padding: '10px 50px',
    backgroundColor: 'white',
    border: '1px solid gainsboro',
    marginRight: 15
  },
  mFire: {
    padding: '10px 50px',
    backgroundColor: '#fd7171',
    border: 'none',
    marginRight: 15
  },
  fFire: {
    padding: '10px 50px',
    backgroundColor: 'red',
    border: 'none',
    color: 'white'
  }
}
const tweetStyle = {
  border: '1px solid gainsboro',
  padding: '5px 20px',
  maxWidth: 500,
  marginBottom: 20
}

class App extends Component {
    constructor() {
      super();
      this.state = {
        tweetData: null,
        userNames: [
          'realDonaldTrump'
        ],
        currentTweet: 0,
      }
      this.fetchTweets = this.fetchTweets.bind(this);
      this.fetchNextTweet = this.fetchNextTweet.bind(this);
    }
    componentDidMount() {
      this.fetchTweets();
    }
    async fetchTweets() {
      const { userNames } = this.state;
      const randomUserIndex = Math.floor(Math.random() * userNames.length);
      const tweetResponse = await axios.get(`/tweet/${userNames[randomUserIndex]}`);
      console.log(tweetResponse)
      if (tweetResponse.data) {
        this.setState({ tweetData: tweetResponse.data.express, currentTweet: 0 });
        console.log(tweetResponse.data.express[0].tweet_text)
      }
    }

    fetchNextTweet() {
      if (this.state.tweetData.length - 1 === this.state.currentTweet) {
        this.fetchTweets()
      } else {
        this.setState(prevState => {
          return { currentTweet: prevState.currentTweet + 1 };
        });
      }
    }

    render() {
        return (
          <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh'
            }}
          >
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <div style={tweetStyle}>
                <p>
                  {this.state.tweetData && 
                      <div>{this.state.tweetData[this.state.currentTweet].tweet_text}</div>
                  }
                </p>
              </div>
              <div>
                <button onClick={this.fetchNextTweet} style={buttonStyle.nFire}>Wouldn't Fire</button>
                <button onClick={this.fetchNextTweet} style={buttonStyle.mFire}>Maybe Fire</button>
                <button onClick={this.fetchNextTweet} style={buttonStyle.fFire}>Fire away</button>
              </div>
            </div>
          </div>
        );
    }
}

export default App;
