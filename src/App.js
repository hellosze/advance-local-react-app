import React, { Component } from 'react'
import './App.css'
import AdUnit from './AdUnit'

const LOTAME_API = 'https://ad.crwdcntrl.net/5/c=931/pe=y/';

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

    this.setState({adSlot1Targeting: 
      {
        "pos": "new-kv-ad300-"+this.dateTime(),
        "size": "300x250"
      }
    });
    this.setState({adSlot2Targeting: 
      {
        "pos": "new-kv-ad728-"+this.dateTime(),
        "size": "728x90"
      }
    });
  }

  dateTime(){
    return new Date().getTime();
  }

  render () {
    var slot1KeyValues = Array();
    var slot2KeyValues = Array();
    const adSlot1Targeting = this.state.adSlot1Targeting;
    const adSlot2Targeting = this.state.adSlot2Targeting;

    Object.keys(adSlot1Targeting).forEach(function(key){
      slot1KeyValues.push(<div className="badge badge-light">{key}={adSlot1Targeting[key]}</div>);
    });

    Object.keys(adSlot2Targeting).forEach(function(key){
      slot2KeyValues.push(<div className="badge badge-light">{key}={adSlot2Targeting[key]}</div>);
    });
    return (
      <div className='advance_local_app'>
      <div className="col-sm-8 col-md-7 py-4">
        <h3>300x250 Ad</h3>
        <AdUnit 
          size={this.state.adSize1}
          slotName={this.state.adSlot1}
          slotKeyValues={this.state.adSlot1Targeting} />
          <div>{slot1KeyValues}</div>
      </div>
      <div className="col-sm-8 col-md-7 py-4">
        <h3>728x90 Ad</h3>
        <AdUnit 
          size={this.state.adSize2}
          slotName={this.state.adSlot2} 
          slotKeyValues={this.state.adSlot2Targeting} />
          <div>{slot2KeyValues}</div>
        </div>

        <button className='button btn-primary' onClick={this.handleClick}>Randomize Slot Key values for Ads</button>
      </div>
    )
  }
}

export default App
