import axios from "axios";

export function setTokenHeader(token){
// we attach the token to any axios request when the user is logged in
	if(token){
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	}else{
		//we do this when we logout
		delete axios.defaults.headers.common["Authorization"];
	}
}


export function apiCall(method,path,data){
	return new Promise((resolve,reject)=>{
		return axios[method.toLowerCase()](path,data)
			.then(res=>{
				return resolve(res.data);
			})
			.catch(err => {
				return reject(err.response.data.error);
			})
	})
}