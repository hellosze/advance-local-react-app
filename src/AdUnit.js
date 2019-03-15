import React, { Component } from 'react'
import PropTypes from 'prop-types';

class AdUnit extends React.Component {
    constructor(props) {
      super(props);
      this.adSize = this.props.size;
      this.slotName = this.props.slotName;
      this.sizeTargetingValue = this.adSize[0]+"x"+this.adSize[1];
      this.slotKeyValues = this.props.slotKeyValues;
      this.slotKeyValues["size"] = this.sizeTargetingValue
      this.state = {
        adSize: this.adSize,
        slotKeyValues: this.slotKeyValues,
        slotName: this.slotName
      };
    }
  
    componentDidMount(){
      const slotName = this.slotName;
      const adSize = this.adSize;
      const slotKeyValues = this.slotKeyValues;
      
      window.googletag.cmd.push(function() {
        var adSlot = window.googletag.defineSlot('/344101295/SI/www.silive.com/news/index.ssf', adSize, slotName);
        if(typeof slotKeyValues === 'object'){
          Object.keys(slotKeyValues).forEach(function(element){
            adSlot.setTargeting(element,slotKeyValues[element]);
          });
        }
        adSlot.addService(window.googletag.pubads());
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

  AdUnit.defaultProps = {
      size: [300, 250],
      slotName: "default-ad-slot"
  }

  AdUnit.propTypes = {
    size: PropTypes.object,
    slotName: PropTypes.string
  };
  
  export default AdUnit