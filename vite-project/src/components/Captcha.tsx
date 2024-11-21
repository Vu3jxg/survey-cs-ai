// Captcha.tsx
import React, { useEffect} from 'react';
import ReCAPTCHA from "react-google-recaptcha";

interface CaptchaProps {
    onTokenChange: (token: string | null) => void;
}

const Captcha: React.FC<CaptchaProps> = ({ onTokenChange }) => {
    const handleCaptchaChange = (token: string | null) => {
        onTokenChange(token);
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div className="mb-6">
            <ReCAPTCHA
                sitekey="6LeByWIqAAAAAKliZcFMioTr0g5kWiB-UaXkIzmt" // Replace with your actual site key
                onChange={handleCaptchaChange}
            />
        </div>
    );
};

export default Captcha;
