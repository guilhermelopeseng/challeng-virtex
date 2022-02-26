import React, {useState, useEffect } from 'react';
import { Table, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

import './index.css'

interface IData {
	OntId: number;
	SnKey: string;
	Slot: number;
	Port: number;
	Status: string;
}

const Zte: React.FC = () => {

	const [datas, setDatas] = useState<IData[]>([])
	const navigate = useNavigate()

	useEffect(()=>{
		loadData()
	},[])

	async function loadData() {
		const response = await api.get('/zte')
		console.log(response)
		setDatas(response.data)
	}

	function newZte () {
		navigate('/zte_form')
	}
	
	return(
		<div className="container">
			<br/>
			<div className="task-header">
				<h1>Zte</h1>
				<Button variant="dark" onClick={newZte}>Criar</Button>
			</div>
			<br/>
			<Table striped bordered hover className="text-center">
			  <thead>
			    <tr>
			      <th>OntId</th>
			      <th>SnKey</th>
			      <th>Slot</th>
			      <th>Port</th>
			      <th>Status</th>
			    </tr>
			  </thead>
			  <tbody>
			  	{
			  		datas.map(data => (
				  			<tr key={data.OntId}>
						      <td>{data.OntId}</td>
						      <td>{data.SnKey}</td>
						      <td>{data.Slot}</td>
						      <td>{data.Port}</td>
						      <td>{data.Status}</td>
						    </tr>
			  			)
			  		)
			  	}
			  </tbody>
			</Table>
		</div>
	);
}

export default Zte;