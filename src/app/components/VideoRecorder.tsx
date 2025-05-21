'use client';

import {
    AcquisitionPreset,
    IadMode,
    OverlayDisplayMode,
    VideoRecorder as UnisseyVideoRecorder,
} from '@unissey-web/sdk-react';

const VideoRecorder = ({
    iad,
    handleRecord,
    handleRecorderReady,
}: {
    iad: string;
    handleRecord: (e: Event) => void;
    handleRecorderReady: (e: any) => void;
}) => {
    return (
        <UnisseyVideoRecorder
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
    );
};

export default VideoRecorder;
