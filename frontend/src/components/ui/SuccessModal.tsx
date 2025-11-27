import { Modal } from './Modal';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    message?: string;
}

export function SuccessModal({ isOpen, onClose, message = 'Purchase Successful!' }: SuccessModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Success">
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
                <h3 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--color-green)' }}>
                    {message}
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '24px' }}>
                    Thank you for your purchase!
                </p>
                <button
                    onClick={onClose}
                    className="btn btn-primary"
                    style={{
                        padding: '10px 24px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--color-green)',
                        color: 'var(--color-navy-primary)',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '600'
                    }}
                >
                    Continue Shopping
                </button>
            </div>
        </Modal>
    );
}
