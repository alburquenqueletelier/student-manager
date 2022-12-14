const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			students: [],
		},
		actions: {
			// localstorage functions
			loadStudents: () => {
				const data = JSON.parse(localStorage.getItem('students'));
				console.log(data);
				setStore(data);
			},
			// Api Functions
			getStudents: async (atributte, value) => {
				if (atributte && value){
					try {
						const resp = await fetch(process.env.BACKEND_URL + "student?"+atributte+'='+value);
						const data = await resp.json();
						setStore(data);
						return data;
					} catch (error) {
						console.log("Error: ", error);
					};
				} else {

					try {
						const resp = await fetch(process.env.BACKEND_URL + "student");
						const data = await resp.json();
						setStore(data);
						localStorage.setItem('students', JSON.stringify(data));
						return data;
					} catch (error) {
						console.log("Error: ", error);
					};
				}
			},
			newStudent: async (student) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "student/create", {
						method: 'POST',
						headers: {
							"Content-type": "application/json"
						},
						body: JSON.stringify(student)
					});
					if (resp.status == 200){
						const data = await resp.json();
						return data;
					} else {
						throw new Error(resp);
					}
				} catch (error) {
					console.log("Error: ", error);
				}
			},
			deleteStudent: async (rut)=>{
				try {
					const resp = await fetch(process.env.BACKEND_URL + "student/delete/" + rut, {
						method: 'DELETE',
						headers: {
							"Content-type": "application/json"
						}
					});
					if (resp.status == 200){
						const data = await resp.json();
						return data;
					} else {
						throw new Error(resp);
					}
				} catch (error) {
					console.log("Error: ", error);
				}
			},
			editStudent: async (student)=>{
				try {
					const resp = await fetch(process.env.BACKEND_URL + "student/edit/"+student.rut, {
						method: 'PUT',
						headers: {
							"Content-type": "application/json"
						},
						body: JSON.stringify(student)
					});
					if (resp.status == 200){
						const data = await resp.json();
						return data;
					} else {
						throw new Error(resp);
					}
				} catch (error) {
					console.log("Error: ", error);
				}
			}

		}
	};
};

export default getState;
