import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const resetPassword = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Паролите не съвпадат.');
            return;
        }

        await fetch('https://kidsground.bg:8009/v1/users/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, password }),
        })
        .then(response => {
            if (response.status === 200) {
                alert('Паролата е променена успешно.');
                navigate('/login');
            } else {
                alert('Възникна грешка, моля опитайте отново.');
            }
        });
    };

    return (
        <div className="register-container page">
            <section className="form-box">
                <h1 id="title">Нова парола</h1>
                <form id="registration-form" onSubmit={resetPassword}>
                    <div className="input-group">
                        <div className="input-field">
                            <i className="fa-solid fa-lock"></i>
                            <input
                                type="password"
                                placeholder="Нова парола"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-field">
                            <i className="fa-solid fa-lock"></i>
                            <input
                                type="password"
                                placeholder="Потвърди парола"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="btn-field">
                            <button type="submit">Промени паролата</button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
};