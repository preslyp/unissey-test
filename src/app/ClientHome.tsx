'use client';

import dynamic from 'next/dynamic';

const BiometricValidationImpl = dynamic(
    () => import('./components/BiometricValidation'),
    { ssr: false }
);

export default function ClientHome() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <BiometricValidationImpl />
        </main>
    );
}
