import React from 'react';
import {  getToken } from './_helper/secureToken'
import { Navigate} from 'react-router-dom';
function PrivateRoute({ children}) {
	let authToken = getToken();
	return authToken ? (
				<>
					<div className="container-fluid p-0">
						{children}
					</div>
				</>
		
	) : (
		<Navigate to="/login" replace={true} />
	)
}
export default PrivateRoute;

