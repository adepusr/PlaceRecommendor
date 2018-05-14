import React, { Component } from 'react';

export default class UserLocationComponent extends Component {
	
	constructor(props) {
		super(props);		
		this.state = {		
			loaded: false
		};		
	}
	render() {		
			return (			
					<div>{this.props.text}
						<img src="/images/me.png" height='30px' width='30px'/>
					</div>				
			);
	}
}