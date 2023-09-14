import {ReactNode, useEffect, useRef} from "react";

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    autoCloseTime?: number; // Optional auto close time in milliseconds
}

export const FeedbackPopup = ({isOpen, onClose, children, autoCloseTime}: PopupProps) => {
    const popupRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (isOpen && popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen && autoCloseTime) {
            const timeoutId = setTimeout(() => {
                onClose();
            }, autoCloseTime);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [isOpen, autoCloseTime, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed top-14 right-60 bg-white w-1/4 rounded-md feedback-shadow z-50 popup-container"
            ref={popupRef}
        >
            {children}
        </div>
    );
}