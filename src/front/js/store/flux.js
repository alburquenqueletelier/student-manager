const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			students: [],
		},
		actions: {
			// localstorage functions
			loadStudents: ()=>{
				const data = JSON.parse(localStorage.getItem('students'));
				console.log(data);
				setStore(data);
			},
			getStudents: async ()=>{
				try{
					console.log(process.env.BACKEND_URL);
					const resp= await fetch(process.env.BACKEND_URL + "student");
					const data = await resp.json();
					setStore(data);
					localStorage.setItem('students', JSON.stringify(data));
					return data;
				} catch(error){
					console.log("Error: ", error);
				};
			},
			
		}
	};
};

export default getState;
