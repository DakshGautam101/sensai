import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { lookups } from "@/app/data/lookups"
import { Button } from './ui/button'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { userDetailContext } from '@/context/UserDetailContext';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { v4 as uuid4 } from 'uuid';
import { createUser } from '@/convex/users';

const SignInDialog = ({ openDialog, closeDialog }) => {
    const { UserDetail, setUserDetail } = React.useContext(userDetailContext);
    const CreateUser = useMutation(api.users.createUser);

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            // console.log(tokenResponse);
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: 'Bearer ' + tokenResponse?.access_token } },
            );

            // console.log(userInfo);
            const user = userInfo?.data;
            await CreateUser({
                name: user?.name,
                email: user?.email,
                picture: user?.picture,
                uid: uuid4()
            });

            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(user));
            }

            setUserDetail(userInfo?.data);

            // saving user into the database

            closeDialog(false);
        },
        onError: errorResponse => console.log(errorResponse),
    });

    return (
        <div>
            <Dialog open={openDialog} onOpenChange={closeDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center">{lookups.SIGNIN_HEADING}</DialogTitle>
                        <DialogDescription className="text-center mt-5">
                            {lookups.SIGNIN_SUBHEADING}
                        </DialogDescription>

                        <div className="flex flex-col justify-center items-center text-center mt-3">
                            <Button
                                onClick={() => googleLogin()}
                                className="bg-blue-500 text-white hover:bg-blue-700 outline-none cursor-pointer mt-5"
                            >
                                SIGN IN WITH GOOGLE
                            </Button>
                            <div className="text-sm text-gray-500 mt-2">
                                {lookups.SIGN_IN_AGREEMENT_TEXT}
                            </div>
                        </div>

                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default SignInDialog
