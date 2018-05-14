import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
import UserLocationComponent from './UserLocationComponent.jsx'
import SuggestedLocations from './SuggestedLocations.jsx'

export default class GoogleMapComponent extends Component {
	constructor(props) {
		super(props);		
		this.state = {			
			placesData: [],
			loaded: false,
			err: null
		};		
		this.getPlacesJSON = this.getPlacesJSON.bind(this);
	}
	
	getPlacesJSON(){
		
		///API REQUEST
		$.get({
            url: '/googleAPI/restaurantsNearme?latitude='+this.props.center.lat+'+&longitude='+this.props.center.lng+'&radius=5000',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({
                    placesData: data.results,
					loaded: true
                })
            }.bind(this),
            error: function(xhr, status, err) {
				this.setState({
					err: err.toString(),
					loaded: true
                })
            }.bind(this)
        })
	}
	
	componentWillMount(){
		this.getPlacesJSON()
	}
	
	render() {
		if(this.state.loaded){
			var props= this.props
			if(this.state.err){
				return(
				<div>{this.state.err}
				</div>
				)
			}else
			return (
			  // Important! Always set the container height explicitly
				<span>
				
					<h2>Places to eat near you ...<b></b></h2>
				  <div style={{ height: '75vh', width: '100%' }}>
					<GoogleMapReact
					  bootstrapURLKeys={{ key: 'AIzaSyC6-bmIO1HkFkHPEXhVYobcwpPjLa4M_ig' }}
					  defaultCenter={this.props.center}
					  defaultZoom={this.props.zoom}>
					  <UserLocationComponent
						lat={this.props.center.lat}
						lng={this.props.center.lng}
						text={'YOUR LOCATION'}
					  />
						{
							this.state.placesData.map((val, index)=>{
									return(
										<SuggestedLocations index= {index}
											lat={val.geometry.location.lat}
											lng={val.geometry.location.lng}
											obj={val} userCenter={props.center}
										  />
									)
							})
						}
						
					</GoogleMapReact>
				  </div>
					
					<h2>List of Favorite Places .... API id ready have to work on UI part</h2>
					<p style={{'color':'white'}}>Will be displayed here as pannels</p>
			</span>
				);
		}else{
			return(
				<h2>LOADING.....</h2>
			)
		}
	 }
}