import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { productService } from '../../services/productService';
import { ShieldCheck, User, Lock, AlertCircle } from 'lucide-react';

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

    const modalTitle = (
        <>
            <ShieldCheck className="w-6 h-6" />
            Admin Login
        </>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={modalTitle}>
            <form onSubmit={handleSubmit} className="form-container">
                {error && (
                    <div className="error-message">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </div>
                )}

                <div className="form-group">
                    <label className="form-label form-label-required">
                        <User className="w-4 h-4" />
                        Username
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="form-input"
                        placeholder="Enter your username"
                        autoComplete="username"
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label form-label-required">
                        <Lock className="w-4 h-4" />
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-input"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        disabled={loading}
                    />
                    <span className="form-hint">
                        Default credentials: rentfate / Pass@123
                    </span>
                </div>

                <div className="form-actions">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
