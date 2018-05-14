import React, { Component } from 'react';
import GoogleMapComponent from './GoogleMapComponent.jsx';

export default class PlaceInformation extends Component {
	
	constructor(props) {
		super(props);		
		this.state = {		
			loaded: false
		};		
	}
	
	render(){
		console.log(this.props)
		if(this.props.info){
			return(
				
			<div>
				{
					this.props.info.reviews.map((val, index)=>{
						return(						
							<div class="col-md-12 col-lg-12 col-sm-12">
								<div class="row">
									<img className="Profileimage" src= { val.profile_photo_url } />
									<h4>{ val.author_name }</h4>
									<p>{ val.text }</p>
								</div>
							</div>
						)
					})
				}
				</div>
			)
		}else{
			return null
		}
	}	
}