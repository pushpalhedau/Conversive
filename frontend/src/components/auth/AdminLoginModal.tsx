import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../ui/Modal';
import { productService } from '../../services/productService';

interface AdminLoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AdminLoginModal({ isOpen, onClose }: AdminLoginModalProps) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await productService.login(username, password);
            localStorage.setItem('isAdmin', 'true');
            onClose();
            navigate('/admin');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Admin Login">
            <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
                {error && (
                    <div style={{
                        padding: '10px',
                        marginBottom: '16px',
                        backgroundColor: 'rgba(249, 199, 79, 0.1)',
                        border: '1px solid var(--color-yellow)',
                        borderRadius: '6px',
                        color: 'var(--color-yellow)'
                    }}>
                        {error}
                    </div>
                )}

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                        Username
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '6px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            color: 'white',
                            fontSize: '14px'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '6px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            color: 'white',
                            fontSize: '14px'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="btn"
                        style={{
                            padding: '10px 20px',
                            borderRadius: '6px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            backgroundColor: 'transparent',
                            color: 'white',
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary"
                        style={{
                            padding: '10px 20px',
                            borderRadius: '6px',
                            backgroundColor: 'var(--color-teal-light)',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
