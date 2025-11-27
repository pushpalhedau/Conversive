import { Modal } from './Modal';
import { CheckCircle } from 'lucide-react';
import { Button } from './Button';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    message?: string;
}

export function SuccessModal({ isOpen, onClose, message = 'Purchase Successful!' }: SuccessModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Success">
            <div className="success-modal-content">
                <CheckCircle className="icon-success-large" />
                <h3 className="success-title">
                    {message}
                </h3>
                <p className="success-message">
                    Thank you for your purchase!
                </p>
                <Button variant="primary" onClick={onClose}>
                    Continue Shopping
                </Button>
            </div>
        </Modal>
    );
}
