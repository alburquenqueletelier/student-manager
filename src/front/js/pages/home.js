import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	const [rut, setRut] = useState("");
	const [name, setName] = useState("");
	const [last_name, setLast_name] = useState("");
	const [grade, setGrade] = useState("");
	const [email, setEmail] = useState("");
	const [date, setDate] = useState("");
	const [is_active, setIs_active] = useState(true);

	const handleCreate = async (e)=>{
		e.preventDefault();
		if (rut.length < 8 || rut.length > 9){
			return alert("Rut invalido");
		};
		const data = {
			rut: rut,
			name: name,
			last_name: last_name,
			grade: grade,
			email: email,
			birth_date: date,
			is_active: is_active
		};
		await actions.newStudent(data);
		await actions.getStudents();
		setRut("");
		setName("");
		setLast_name("");
		setGrade("")
		setEmail("");
		setDate("");
	};

	const handleSelect = (e) => {
		console.log(e);
	};

	const handleEdit = (e) =>{

	};

	const handleDelete = async (rut) =>{
		if (rut.length < 8 || rut.length > 9){
			return alert("Rut invalido");
		};
		await actions.deleteStudent(rut);
		await actions.getStudents();
	};

	return (
		<div className="container-fluid">
			{/* Modal */}

			<div className="modal fade" id="newStudentModal" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="modalLabel">Plantilla alumno</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<form onSubmit={handleCreate}>
						<div className="modal-body">
								<div className="form-floating mb-2">
									<input onChange={(e)=>setRut(e.target.value)} required value={rut} type="text" className="form-control" id="rut" placeholder="Rut"/>
									<label htmlFor="rut">Rut sin puntos ni guión</label>
								</div>
								<div className="form-floating mb-2">
									<input onChange={(e)=>setName(e.target.value)} required value={name} type="text" className="form-control" id="name" placeholder="Nombre"/>
									<label htmlFor="name">Nombre</label>
								</div>
								<div className="form-floating mb-2">
									<input onChange={(e)=>setLast_name(e.target.value)} required value={last_name} type="text" className="form-control" id="last_name" placeholder="Apellido"/>
									<label htmlFor="last_name">Apellido</label>
								</div>
								<div className="form-floating mb-2">
									<input onChange={(e)=>setGrade(e.target.value)} required value={grade} type="text" className="form-control" id="grade" placeholder="Grado"/>
									<label htmlFor="grade">Grado</label>
								</div>
								<div className="form-floating mb-2">
									<input onChange={(e)=>setEmail(e.target.value)} required value={email} type="email" className="form-control" id="email" placeholder="Email"/>
									<label htmlFor="email">Email</label>
								</div>
								<div className="form-floating">
									<input onChange={(e)=>setDate(e.target.value)} required value={date} type="date" className="form-control" id="birth_date" placeholder="Fecha Nacimiento"/>
									<label htmlFor="birth_date">Fecha Nacimiento</label>
								</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							<button type="submit" className="btn btn-primary">Enviar</button>
						</div>
						</form>
					</div>
				</div>
			</div>			
			{/* Modal */}
			<h2 className="text-center">Panel de control</h2>
			<div className="d-flex flex-sm-row flex-column justify-content-center mb-2">
				<select name="select" onChange={handleSelect} defaultValue="">
					<option value="" defaultValue disabled hidden>Filtrar por:</option>
					<option value="rut">Rut</option>
					<option value="name">Nombre</option>
					<option value="value3">Apellido</option>
					<option value="value3">Grado</option>
					<option value="value3">Email</option>
				</select>
				<input type="text" className="me-3" placeholder="buscar" />
				<button type="button" className="btn btn-success add" data-bs-toggle="modal" data-bs-target="#newStudentModal">Agregar Alumno</button>
			</div>
			{!!store?.students
				? (
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
								{store.students.map((item, index) => {
									return (
										<tr key={index}>
											<th scope="row">{index + 1}</th>
											<td>{item.rut}</td>
											<td>{item.name}</td>
											<td>{item.last_name}</td>
											<td>{item.grade}</td>
											<td>{item.email}</td>
											<td>{item.birth_date}</td>
											<td><button type="button" className="btn p-0 d-flex m-auto" onClick={(e)=>handleEdit(item)}><img className="option-img" src="https://cdn-icons-png.flaticon.com/512/738/738880.png" alt="editar" /></button></td>
											<td><button type="button" className="btn p-0 d-flex m-auto" onClick={(e)=>handleDelete(item.rut)}><img className="option-img" src="https://cdn-icons-png.flaticon.com/512/8568/8568248.png" alt="eliminar" /></button></td>
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
