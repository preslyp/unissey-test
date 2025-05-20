import dynamic from 'next/dynamic';

const BiometricValidation = dynamic(() => import('./components/BiometricValidation'), {
    ssr: false,
});

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <BiometricValidation />
        </main>
    );
}
