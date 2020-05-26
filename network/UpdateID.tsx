import { State } from "../Store";

const UpdateID = (state : State) : any => {

    fetch(state.serverURL+ '/certificate/id')
            .then((response) => response.json())
            .then((json) => {
                console.log("Returning ID: " + json.id)
                state.ID = json.id
            })
            .catch((error) => console.error(error));
}

export default UpdateID
