const Reducer = require('../src/context/Reducer');

test("Reducer with login start", () => {
    const mock_state = {type: "LOGIN_START",
                        payload: "mock_payload",
                        payment: function lambda(value) {return(true);},
                        }
    
    expect(Reducer({}, mock_state)).toEqual(
        {
            user: null,
            isFetching: true,
            error: false,
        }
    );
})

test("Reducer with login success", () => {
    const mock_state = {type: "LOGIN_SUCCESS",
                        payload: "mock_payload"}
    
    expect(Reducer({}, mock_state)).toEqual(
        {
            user: "mock_payload",
            isFetching: false,
            error: false,
        }
    );
})

test("Reducer with login failure", () => {
    const mock_state = {type: "LOGIN_FAILURE",
                        payload: "mock_payload"}
    
    expect(Reducer({}, mock_state)).toEqual(
        {
            user: null,
            isFetching: false,
            error: true,
        }
    );
})

test("Reducer with logout", () => {
    const mock_state = {type: "LOGOUT",
                        payload: "mock_payload"}
    
    expect(Reducer({}, mock_state)).toEqual(
        {
            user: null,
            isFetching: false,
            error: false,
        }
    );
})