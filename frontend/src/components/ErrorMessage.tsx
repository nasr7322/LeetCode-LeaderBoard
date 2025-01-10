import React from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
    message: string;
}

export const ErrorMessage: React.FC<Props> = ({ message }) => (
    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-red-400 flex items-start gap-3">
        <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-0.5" />
        <div>
            <h4 className="font-semibold mb-1">Error</h4>
            <p>{message}</p>
        </div>
    </div>
);
