import React from 'react';
import { Route, Routes } from "react-router-dom";

import Home from './pages/Home';
import Huawei from './pages/Huawei';
import HuaweiForm from './pages/Huawei/Form';
import Zte from './pages/Zte';
import ZteForm from './pages/Zte/Form';

const Router: React.FC = () => {
	return(
			<Routes>
				<Route path="/" element={<Home/>} />
				<Route path="/huawei" element={<Huawei/>} />
				<Route path="/huawei_form" element={<HuaweiForm/>} />
				<Route path="/zte" element={<Zte/>} />
				<Route path="/zte_form" element={<ZteForm/>} />
			</Routes>
	);
}

export default Router;