import React, {useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import api from '../../../services/api';

import './index.css'

interface IData {
	SnKey: string;
	Slot: number;
	Port: number;
	Status: string;
}

const Zte: React.FC = () => {

	const navigate = useNavigate()
	const [model, setModel] = useState<IData>({
		SnKey: '',
		Slot: 0,
		Port: 0,
		Status: ''
	})

	function postModel (e: ChangeEvent<HTMLInputElement|HTMLSelectElement>) {
		const value = +e.target.value;
		if(isNaN(value)){
			setModel({
				...model,
				[e.target.name]: e.target.value
			})

		} else{
			setModel({
				...model,
				[e.target.name]: +e.target.value
			})
		}
	}

	async function onSubmit (e: ChangeEvent<HTMLFormElement>) {
		e.preventDefault()

		const response = await api.post('/zte', model)

		console.log(response)
		navigate('/zte')
	}

	function back () {
		navigate('/zte')
	}

	return(
		<div className="container">
			<br/>
			<div className="task-header">
				<h1>Nova Zte</h1>
				<Button variant="dark" onClick={back}>Voltar</Button>
			</div>
			<br/>
			<div className="container">
				<Form onSubmit={onSubmit}>
				  <Form.Group className="mb-3">
				    <Form.Label>SnKey</Form.Label>
				    <Form.Control type="text" placeholder="SnKey"
				    name="SnKey" 
				    onChange={(e: ChangeEvent<HTMLInputElement>) => postModel(e)}/>
				  </Form.Group>

				  <Form.Group className="mb-3">
				    <Form.Label>Slot</Form.Label>
				    <Form.Control type="number" placeholder="Slot"
				    name="Slot" 
				    onChange={(e: ChangeEvent<HTMLInputElement>) => postModel(e)}/>
				  </Form.Group>

				  <Form.Group className="mb-3">
				    <Form.Label>Port</Form.Label>
				    <Form.Control type="number" placeholder="Port"
				    name="Port" 
				    onChange={(e: ChangeEvent<HTMLInputElement>) => postModel(e)}/>
				  </Form.Group>

				  <Form.Group className="mb-3">
				      <Form.Label htmlFor="disabledSelect">Status</Form.Label>
				      <Form.Select id="disabledSelect" name="Status" onChange={(e: ChangeEvent<HTMLSelectElement>) => postModel(e)}>
				        <option>Online</option>
				        <option>Offline</option>
				      </Form.Select>
				    </Form.Group>

				  <Button variant="primary" type="submit">
				    Salvar
				  </Button>
				</Form>
			</div>
		</div>
	);
}

export default Zte;