import { Button, Dialog, DialogTitle, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';


const Login = () => {
    const { user, loginWithRedirect } = useAuth0();

    const loginHandler = () => {
        loginWithRedirect();
    };


    return (
        <Dialog open>
            <DialogTitle mt={'2rem'} textAlign={'center'}>Login</DialogTitle>
            <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
                <Button variant='contained' onClick={loginHandler}>Login Here</Button>
            </Stack>
        </Dialog>
    );
}

export default Login;
