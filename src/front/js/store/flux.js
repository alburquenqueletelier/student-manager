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
			getStudents: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "student");
					const data = await resp.json();
					setStore(data);
					localStorage.setItem('students', JSON.stringify(data));
					return data;
				} catch (error) {
					console.log("Error: ", error);
				};
			},
			newStudent: async (data) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "student/create", {
						method: 'POST',
						headers: {
							"Content-type": "application/json"
						},
						body: JSON.stringify(data)
					});
					if (resp.status == 200){
						const data = await resp.json();
						return 200;
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
