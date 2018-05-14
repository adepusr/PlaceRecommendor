import React, { Component } from 'react';
import Modal from 'react-modal';
import GoogleMapReact from 'google-map-react';
import DirectionsRenderer from "react-google-maps";
import PlaceInformation from './PlaceInformation.jsx';
import FavoriteButton from './FavoriteButton.jsx';

export default class UserLocationComponent extends Component {
	
	constructor(props) {
		super(props);		
		this.state = {		
			modalIsOpen: false,
			loaded: false,
			err: null,
			directions: null,
			moreInfo: null,
			showMap: false,
			showReviews: false,
			favorite: false
		};		
		this.moreInfor= this.moreInfor.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.getDirections = this.getDirections.bind(this);
		this.moreDetails = this.moreDetails.bind(this);
		this.getfavStatus= this.getfavStatus.bind(this);
	}
	moreInfor(obj) {
		this.getfavStatus(this.props.obj.place_id);
	}
	
 	getfavStatus(id){
		$.get({
				url: '/dbServices/favStatus?placeID='+id,
				dataType: 'json',
				cache: false,
				success: (data)=> {
					if(data !== "notfound"){
						this.setState({
							favorite: data.favorite,
							modalIsOpen: true
						})
					}else{
						this.setState({
							favorite: false,
							modalIsOpen: true
						})
					}
				},
				error: function(xhr, status, err) {
					this.setState({
						err: err.toString(),
						loaded: true
					})
				}.bind(this)
			})
	}
	
	afterOpenModal() {
	// references are now sync'd and can be accessed.
	}

	closeModal() {
		this.setState({modalIsOpen: false});
	}
	
	moreDetails(){
		if(!this.state.showReviews){
			$.get({
				url: '/googleAPI/placeDetails?placeID='+this.props.obj.place_id,
				dataType: 'json',
				cache: false,
				success: function(data) {
					this.setState({
						moreInfo: data,
						showReviews: true,
						showMap: false
					})
				}.bind(this),
				error: function(xhr, status, err) {
					this.setState({
						err: err.toString(),
						loaded: true
					})
				}.bind(this)
			})
		}else{			
			this.setState({
				showReviews: false,
			})
		}				
	}
	getDirections(){	
		if(!this.state.showMap){			
			var DirectionsService= new google.maps.DirectionsService()
			DirectionsService.route({
				origin: new google.maps.LatLng(this.props.userCenter.lat, this.props.userCenter.lng),
				destination: new google.maps.LatLng(this.props.obj.geometry.location.lat, this.props.obj.geometry.location.lng),
				travelMode: google.maps.TravelMode.DRIVING,
			  }, (result, status) => {
				if (status === google.maps.DirectionsStatus.OK) {
				  this.setState({
						directions: result,
						showMap: true,
						showReviews: false
				  });
					var cnt = new google.maps.LatLng(this.props.userCenter.lat, this.props.userCenter.lng)
					var mapOptions = {
					zoom:16,
					center: cnt
				  }
				  var map = new google.maps.Map(document.getElementsByClassName("map"+this.props.index)[0], mapOptions);
				  var directionsDisplay = new google.maps.DirectionsRenderer();

				  directionsDisplay.setMap(map);			
				  directionsDisplay.setDirections(result);
					$(".map"+this.props.index).css({position: 'relative', height: '50vh', width: '95%'});
					var direc=""
					result.routes[0].legs[0].steps.map((val,indx)=>{						
							direc += "<div class='dir_title2'><p>STEP "+ (indx+1) +":</p><div>"+val.instructions+"</div></div>";
					})					
					$(".directions"+this.props.index).append(direc);
				} else {
				  console.error(`error fetching directions ${result}`);
				}
			  });
		}else{		
			this.setState({
				showMap: false,
			})
		}
	}
	render() {	
			const customStyles = {
			  content : {
				top                   : '50%',
				left                  : '50%',
				right                 : 'auto',
				bottom                : 'auto',
				marginRight           : '-50%',
				transform             : 'translate(-50%, -50%)',
				width 				  : '850px',
				height				  : '650px'
			  }
			};
		
			return (	
				<span>
					<Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} contentLabel="Example Modal">
					  <button onClick={this.closeModal} style={{'float': 'right'}} class="btn">X</button>
					  	<h3>{this.props.obj.name} </h3>
						<div class="ratingBox">
							<p>{ this.props.obj.rating } / 5 </p>
						</div>
						<p>Address: {this.props.obj.formatted_address}</p>
						<div class="button_wrapper col-md-12 col-lg-12 col-sm-12">						
							<button onClick= {this.getDirections} class="btn btn-danger" >{ this.state.showMap? "Hide Directions": "Get Directions"} </button>
							<button onClick={this.moreDetails} class="btn btn-danger" >{ this.state.showReviews? "Hide Reviews" : "Reviews" }</button>
							
							<FavoriteButton favorite={this.state.favorite} placeID={this.props.obj.place_id}/>
						</div>
						{
							this.state.showMap? 
								<div>
									<div class={"map"+this.props.index} style={{position: 'relative'}} />
									<div class="dir_title1" style={{'display': 'inline-block'}}><p style={{'display': 'inline-block'}}>Total Diastance:</p>
										<p style={{'display': 'inline-block', 'color': 'black', 'padding':'10px'}}>{this.state.directions.routes[0].legs[0].distance.text}</p>
									</div>
									<div class="dir_title1" style={{'display': 'inline-block'}}><p style={{'display': 'inline-block'}}>Total Duration: </p>
										<p style={{'display': 'inline-block', 'color': 'black', 'padding':'10px'}}>{this.state.directions.routes[0].legs[0].duration.text}</p>
									</div>
									<div class={"dir_title1 directions"+this.props.index }><p>Directions: </p></div>
									</div>: null
						}
							
						{
							this.state.showReviews? <PlaceInformation info={ this.state.moreInfo }/>: null
						}
						
						
					</Modal>
					
					
					
					<div style={{'cursor':'pointer'}} class="suggestedMarkers" onClick={ ()=>this.moreInfor(this.props.obj) }>{this.props.obj.name}
						<img src="/images/placeIcon.png" height='25px' width='25px'/>
					</div>
				</span>
			);
	}
}