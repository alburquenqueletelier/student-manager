import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	const handleSelect = (e) => {
		console.log(e);
	};

	return (
		<div className="container-fluid">
			<h2 className="text-center">Panel de control</h2>
			<div className="d-flex justify-content-center mb-2">
				<select name="select" onChange={handleSelect} defaultValue="">
					<option value="" defaultValue disabled hidden>Filtrar por:</option>
					<option value="rut">Rut</option>
					<option value="name">Nombre</option>
					<option value="value3">Apellido</option>
					<option value="value3">Grado</option>
					<option value="value3">Email</option>
				</select>
				<input type="text" className="me-3" placeholder="buscar" />
				<button type="button" className="btn btn-success add">Agregar Alumno</button>
			</div>
			{!!store?.students 
			?(			
			<div className="table-responsive">
				<table className="table table-striped">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Rut</th>
							<th scope="col">Nombre</th>
							<th scope="col">Apellido</th>
							<th scope="col">Grado</th>
							<th scope="col">Email</th>
							<th scope="col">Fecha Nacimiento</th>
							<th scope="col">Editar</th>
							<th scope="col">Eliminar</th>
						</tr>
					</thead>
					<tbody className="text-center">
						{store.students.map((item,index)=>{
							return (
								<tr key={index}>
									<th scope="row">{index+1}</th>
									<td>{item.rut}</td>
									<td>{item.name}</td>
									<td>{item.last_name}</td>
									<td>{item.grade}</td>
									<td>{item.email}</td>
									<td>{item.birth_date}</td>
									<td><img className="option-img" src="https://cdn-icons-png.flaticon.com/512/738/738880.png" alt="editar"/></td>
									<td><img className="option-img" src="https://cdn-icons-png.flaticon.com/512/8568/8568248.png" alt="eliminar"/></td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>) : (
				<h2 className="text-center">No hay alumnos. Agregalos <button type="button" className="btn">Aquí</button></h2>
			)

			}
		</div>
	);
};
