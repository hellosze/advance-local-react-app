import React, { Component } from 'react'
import './App.css'

const LOTAME_API = 'https://ad.crwdcntrl.net/5/c=931/pe=y/';

class AdUnit extends React.Component {
  constructor(props) {
    super(props);
    this.adSize = this.props.size;
    this.slotName = this.props.slotName;
    this.sizeTargetingKeyValue = this.adSize[0]+"x"+this.adSize[1];
    this.state = {
      adSize: this.adSize,
      sizeTargetingKeyValue: this.sizeTargetingKeyValue,
      slotName: this.slotName
    };
  }

  componentDidMount(){
    const slotName = this.slotName;
    const adSize = this.adSize;
    const sizeTargetingKeyValue = this.sizeTargetingKeyValue;
    
    window.googletag.cmd.push(function() {
      window.googletag.defineSlot('/344101295/SI/www.silive.com/news/index.ssf', adSize, slotName).setTargeting('size', [sizeTargetingKeyValue]).addService(window.googletag.pubads());
      window.googletag.display(slotName);
      window.googletag.pubads().setTargeting("tpid",localStorage.getItem("tpid"));
      window.googletag.enableServices();
    });
  }

  render() {
    const slotName = this.slotName;
    return (
      <div className="gpt-ads" id={slotName}></div>
    )
  }
}

class App extends Component {
  constructor () {
    super() 
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      tpid: null,
      adSlot1: "div-gpt-ad-300x250",
      adSize1: [300, 250],
      adSlot1Targeting: {pos: "ad300"},
      adSlot2: "div-gpt-ad-728x90",
      adSize2: [728, 90],
      adSlot2Targeting: {pos: "ad728"}
    }
  }

  componentDidMount(){
    fetch(LOTAME_API)
    .then((res) => { return res.json()})
    .then(
      (result) => {
        this.setState({
          tpid: result.tpid || "none"
        });

        // update localStorage
        localStorage.setItem("tpid", this.state.tpid);
      },

      (error) => {
        this.setState({
          error
        });
      }
    )
  }

  handleClick () {
    this.setState({
        adSlot1: "div-gpt-ad300-"+this.dateTime()
      });
    this.setState({
      adSlot2: "div-gpt-ad728-"+this.dateTime()
    });

    this.setState({adSlot1Targeting: {
        "pos": "ad300-"+this.dateTime()
      }
    });
    this.setState({adSlot2Targeting: {
        "pos": "ad728-"+this.dateTime()
      }
    });
  }

  dateTime(){
    return new Date().getTime();
  }

  render () {
    return (
      <div className='advance_local_app'>
      <div className="col-sm-8 col-md-7 py-4">
        <h3>300x250 Ad</h3>
        <AdUnit 
          size={this.state.adSize1}
          slotName={this.state.adSlot1}
          slotKeyValues={this.state.adSlot1Targeting} />
      </div>
      <div className="col-sm-8 col-md-7 py-4">
        <h3>728x90 Ad</h3>
        <AdUnit 
          size={this.state.adSize2}
          slotName={this.state.adSlot2} 
          slotKeyValues={this.state.adSlot2Targeting} />
        </div>

        <button className='button btn-primary' onClick={this.handleClick}>Randomize Key values for Ads</button>
      </div>
    )
  }
}
export default App
