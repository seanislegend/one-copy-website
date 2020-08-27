import React, {useEffect, useState, FormEvent} from 'react';
import ButtonLabel from '@/components/ButtonLabel';
import copy from '@/locales/en.json';
import RequestType from '@/types/request';

const EmailRegistration: React.FC = () => {
    const [email, setEmail] = useState('');
    const [requestStatus, setRequestStatus] = useState<Partial<RequestType>>(RequestType.DEFAULT);
    const [requestFeedback, setRequestFeedback] = useState('');

    const checkRegistration = () => {
        const hasRegistered = localStorage.getItem('registered');

        if (hasRegistered) {
            setRequestStatus(RequestType.SUCCESS);
        }
    };

    const handleSubmitError = message => {
        setRequestFeedback(message);
        setRequestStatus(RequestType.ERROR);

        setTimeout(() => setRequestStatus(RequestType.DEFAULT), 2000);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (requestStatus !== RequestType.DEFAULT) {
            return;
        }

        setRequestStatus(RequestType.PENDING);

        try {
            const request = await fetch('/api/register', {
                body: JSON.stringify({email}),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            });
            const response = await request.json();

            if (response.error) {
                handleSubmitError(response.error);
            } else {
                setRequestStatus(RequestType.SUCCESS);
                localStorage.setItem('registered', new Date().getTime().toString());
            }
        } catch (error) {
            handleSubmitError(error.message);
        }
    };

    useEffect(() => {
        checkRegistration();
    }, []);

    if (requestStatus === RequestType.SUCCESS) {
        return (
            <div key="success" className="mt-8 rounded-md p-4 bg-gray-100 animate-fadeInUp">
                <p className="text-base font-default text-gray-600">
                    <strong className="font-semibold">{copy.home.register.success[0]}</strong>{' '}
                    {copy.home.register.success[1]}
                </p>
            </div>
        );
    }

    return (
        <div className="mt-8 rounded-md p-4 bg-gray-100 animate-fadeInUp">
            <p className="text-base font-medium text-gray-600">
                <span className="mr-2 sm:mr-3">🍁</span>
                {copy.home.register.title}
            </p>

            <form className="mt-2 sm:flex" onSubmit={handleSubmit}>
                <input
                    aria-label="Email"
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 text-base leading-6 rounded-md placeholder-gray-500 shadow-sm focus:outline-none focus:placeholder-gray-400 focus:shadow-outline-green focus:border-green-300 transition duration-150 ease-in-out sm:flex-1"
                    disabled={requestStatus !== RequestType.DEFAULT}
                    onChange={event => setEmail(event.target.value)}
                    placeholder={copy.home.register.email_placeholder}
                    required={true}
                    type="email"
                />
                <button
                    type="submit"
                    className="transform mt-3 w-full px-6 py-3 border-0 text-base leading-6 font-medium rounded-md text-white bg-gradient-to-r from-teal-400 to-green-500 shadow-sm hover:shadow-md focus:outline-none focus:scale-95 focus:shadow-outline-blue transition duration-200 ease-in-out sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"
                >
                    <ButtonLabel label={copy.home.register.submit} status={requestStatus} />
                </button>
            </form>

            {requestFeedback && (
                <p className="mt-2 text-sm text-gray-600 animate-fadeInUp">{requestFeedback}</p>
            )}
        </div>
    );
};

export default EmailRegistration;
