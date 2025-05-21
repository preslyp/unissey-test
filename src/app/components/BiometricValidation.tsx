'use client';

import '@webcomponents/webcomponentsjs';
import axios from 'axios';
import 'core-js';
import 'lit/polyfill-support.js';
import { useEffect, useState } from 'react';
import 'regenerator-runtime/runtime';
import './unisseyStyling.css';

import VideoRecorder from './VideoRecorder';

const BiometricValidationImpl = () => {
    const [iad, setIad] = useState('');
    const handleRecord = (e: Event) => {
        const data = (e as CustomEvent<{ media: Blob; metadata: string }>)
            .detail;
        console.log(data);
    };

    const handleRecorderReady = (e: any) => {
        e.detail.recorderElmt?.dispatchEvent(new CustomEvent('startCapture'));
    };

    useEffect(() => {
        // Import browser-only dependencies
        import('@webcomponents/webcomponentsjs');
        import('core-js');
        import('lit/polyfill-support.js');
        import('regenerator-runtime/runtime');

        axios
            .post(
                `${process.env.NEXT_PUBLIC_UNISSEY_URL}/iad/prepare`,
                {},
                {
                    headers: {
                        Authorization: process.env.NEXT_PUBLIC_UNISSEY_KEY,
                    },
                }
            )
            .then((response) => {
                setIad(response.data);
            })
            .catch((error) => {
                console.warn(error);
            });
    }, []);

    if (!iad) return <div>Loading...</div>;

    return (
        <div className="flex flex-col items-center justify-center grow">
            <VideoRecorder
                iad={iad}
                handleRecord={handleRecord}
                handleRecorderReady={handleRecorderReady}
            />
        </div>
    );
};

export default BiometricValidationImpl;
