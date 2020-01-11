import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postNewMessage} from '../store/actions/messages';


class MessageForm extends Component{
	constructor(props){
		super(props);
		this.state={
			message:""
		}
		this.handleSubmit=this.handleSubmit.bind(this);
	}
	handleSubmit(e){
		e.preventDefault();
		console.log(this.props);
		this.props.postNewMessage(this.state.message);
		this.setState({message:""});
		this.props.history.push("/");
	}
	render(){
		return (
			<div>
			{this.props.errors.message && (
				<div className="alert alert-danger">{this.props.errors.message}</div>
			)}
				<form onSubmit={this.handleSubmit}>
					<input 
						type="text"
						className="form-control" 
						onChange={e=>this.setState({message:e.target.value})} 
						value={this.state.message}/>
					<button type="submit" className="btn btn-success pull-right">Add New Message</button>

				</form>

			</div>

		)
	}
}
function mapStateToProps(state){
	return {
		errors:state.errors
	}
}


export default connect(mapStateToProps,{postNewMessage})(MessageForm);
