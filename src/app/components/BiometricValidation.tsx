'use client';

import { AcquisitionPreset, IadMode, OverlayDisplayMode, VideoRecorder } from '@unissey-web/sdk-react';
import '@webcomponents/webcomponentsjs';
import axios from 'axios';
import 'core-js';
import 'lit/polyfill-support.js';
import { useEffect, useState } from 'react';
import 'regenerator-runtime/runtime';
import './unisseyStyling.css';

const BiometricValidationImpl = () => {
    const [iad, setIad] = useState('');
    const handleRecord = (e: Event) => {
        const data = (e as CustomEvent<{ media: Blob; metadata: string }>).detail;
        console.log(data);
    };

    const handleRecorderReady = (e: any) => {
        e.detail.recorderElmt?.dispatchEvent(new CustomEvent('startCapture'));
    };

    useEffect(() => {
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
                style={{ width: 'auto', color: 'white' }}
                config={{
                    iadConfig: {
                        mode: IadMode.PASSIVE,
                        data: iad,
                    },
                    overlayConfig: {
                        displayMode: OverlayDisplayMode.OVAL,
                        colors: {
                            background: [0, 0, 0, 0.7],
                            progressColor: [55, 198, 171, 1],
                        },
                    },
                }}
                strings={{
                    hints: {
                        up: 'Move your face up',
                        down: 'Move your face down',
                        perfect: "Perfect, don't move",
                        right: 'Move your face to the right',
                        left: 'Move your face to the left',
                        closer: 'Get closer',
                        record: 'Record',
                        nil: '',
                    },
                    retry: 'Retry',
                    errors: {
                        noFace: 'No face detected, please try again',
                    },
                }}
                onRecordCompleted={handleRecord}
                onRecorderReady={handleRecorderReady}
                hideCaptureBtn
                faceChecker="enabled"
                preset={AcquisitionPreset.SELFIE_SUBSTANTIAL}
            />
        </div>
    );
};

export default BiometricValidationImpl;
