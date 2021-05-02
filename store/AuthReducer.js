const initial_state={
    token:null,
    userId:null
}

export const AuthReducer=(state=initial_state,action)=>{
    switch (action.type) {
        case "LOGIN":
            return {
                token:action.token,
                userId:action.id
            }
        case "SIGNUP":
            return {
                token:action.token,
                userId:action.id
            }
    
        case "AUTH":
            return {
                token:action.token,
                userId:action.userId
            }

        case "LOGOUT":
            return {
                token:null,
                userId:null
            }
        default:
           return state;
    }
}