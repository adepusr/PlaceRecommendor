import React, { Component } from 'react';

export default class FavoriteButton extends Component {
	constructor(props) {
		super(props);		
		this.state = {		
			favorite: this.props.favorite,
			placeID: this.props.placeID
		};		
		this.savePlace = this.savePlace.bind(this);
	}
	
	savePlace(){
		var placeID= this.state.placeID;
		var fav= !this.state.favorite
		console.log(this.state)
		$.post('/dbServices/updatePlace', 
		{
			'placeID': placeID,
			'fav': fav
		}, (result)=> {
		  if (result == 'OK') {
			this.setState({
				favorite: fav
			})
		  } else {
			alert(result);
		  }
		})
		
	}
	render(){
		console.log(this.state)
		return(			
			<button onClick={this.savePlace} class={this.state.favorite? "btn btn-info" : "btn btn-danger"} >{ this.state.favorite? "FAVORITE" : "ADD TO FAVORITE" }</button>
		)
	}
}