import React, { Component } from 'react';
import GoogleMapComponent from './GoogleMapComponent.jsx';

export default class MainPage extends Component {
	
	constructor(props) {
		super(props);		
		this.state = {		
			latitude: 44.123,
			longitude: 82.123,
			loaded: false
		};		
		this.getLocation = this.getLocation.bind(this);
		this.showPosition = this.showPosition.bind(this);
	}
	
	getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.showPosition);
		} else {
			alert("Geolocation is not supported by this browser.");
		}
	}
	
	showPosition(position) {
		this.setState({
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
			loaded: true,			
		})
	}	
	componentWillMount(){
			this.getLocation()
	}	
	render() {
		if(this.state.loaded){		
			return (
				<div>
					<GoogleMapComponent center={ {'lat': this.state.latitude,'lng': this.state.longitude }} zoom={14}>			
					</GoogleMapComponent>	  
				</div>
			);
		}else{			
			return (
				<div>
					<h2>Loading .... !!!</h2>
				</div>
			);
		}
	}
}